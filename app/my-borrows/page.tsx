"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { BorrowCard } from "@/components/borrows/BorrowCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { useConfirm } from "@/components/shared/ConfirmProvider"
import { Spinner } from "@/components/shared/Spinner"
import { getMyBorrows, returnBook, type Borrow } from "@/lib/api"
import { getAuthToken } from "@/lib/auth-token"

function MyBorrows() {
  const confirm = useConfirm()
  const [borrows, setBorrows] = useState<Borrow[]>([])
  const [loading, setLoading] = useState(true)
  const [returningId, setReturningId] = useState<string | null>(null)

  // Changing reloadKey makes the effect below fetch the list again
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    getAuthToken()
      .then(getMyBorrows)
      .then((data) => {
        if (!cancelled) setBorrows(data)
      })
      .catch((err) => toast.error(err.message || "Could not load your borrowed books"))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  async function handleReturn(borrowId: string) {
    // Ask first. The code below runs only if the user clicks "Yes, return it"
    const ok = await confirm({
      title: "Return this book?",
      description:
        "It will be marked as returned and become available to others.",
      confirmText: "Yes, return it",
      cancelText: "Keep reading",
    })
    if (!ok) return

    setReturningId(borrowId)
    try {
      const token = await getAuthToken()
      await returnBook(token, borrowId)
      toast.success("Book returned. Thank you!")
      setReloadKey((k) => k + 1) // reload so the list matches the database
    }
    finally {
      setReturningId(null)
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeading subtitle="Keep track of what you are reading and when it is due.">
        My Borrows
      </SectionHeading>

      {loading ? (
        <Spinner />
      ) : borrows.length === 0 ? (
        <p className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          You have not borrowed any books yet.
        </p>
      ) : (
        <div className="space-y-4">
          {borrows.map((borrow) => (
            <BorrowCard
              key={borrow._id}
              borrow={borrow}
              onReturn={handleReturn}
              returning={returningId === borrow._id}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default function MyBorrowsPage() {
  return (
    <AuthGuard>
      <MyBorrows />
    </AuthGuard>
  )
}
