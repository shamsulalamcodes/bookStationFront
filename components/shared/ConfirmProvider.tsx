"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// What the caller can customize
export type ConfirmOptions = {
  title?: string
  description?: React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive" // destructive = red button (delete, return...)
}

// confirm() opens the dialog and gives back a Promise:
//   true  -> user clicked the confirm button
//   false -> user clicked cancel, pressed Esc, or clicked outside
type ConfirmFn = (options?: ConfirmOptions) => Promise<boolean>

const ConfirmContext = React.createContext<ConfirmFn | null>(null)

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<ConfirmOptions>({})

  // Holds the "resolve" of the Promise we returned to the caller
  const resolveRef = React.useRef<((answer: boolean) => void) | null>(null)

  const confirm = React.useCallback<ConfirmFn>((opts = {}) => {
    // If another dialog is somehow still waiting, treat it as cancelled
    resolveRef.current?.(false)

    setOptions(opts)
    setOpen(true)

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
    })
  }, [])

  // Close the dialog and send the answer back to the caller
  function finish(answer: boolean) {
    resolveRef.current?.(answer)
    resolveRef.current = null
    setOpen(false)
  }

  const {
    title = "Are you sure?",
    description,
    confirmText = "Yes",
    cancelText = "Cancel",
    variant = "default",
  } = options

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          // Esc key or click outside counts as "No"
          if (!nextOpen) finish(false)
        }}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => finish(false)}
            >
              {cancelText}
            </Button>
            <Button
              variant={variant}
              className="cursor-pointer"
              onClick={() => finish(true)}
            >
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  )
}

// Use this in any component: const confirm = useConfirm()
export function useConfirm(): ConfirmFn {
  const confirm = React.useContext(ConfirmContext)
  if (!confirm) {
    throw new Error("useConfirm must be used inside <ConfirmProvider>")
  }
  return confirm
}
