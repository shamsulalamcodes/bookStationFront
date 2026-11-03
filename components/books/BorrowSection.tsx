"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"
import { borrowBook } from "@/lib/api"
import { getAuthToken } from "@/lib/auth-token"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

const DAY_OPTIONS = [3, 7, 14]

// Day picker + Borrow button for the Book Details page
export function BorrowSection({
  bookId,
  availableCopies,
  onBorrowed,
}: {
  bookId: string
  availableCopies: number
  onBorrowed: () => void
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const [days, setDays] = useState(7)
  const [loading, setLoading] = useState(false)

  const notAvailable = availableCopies <= 0

  async function handleBorrow() {
    // Logged out: send to login, then come back to this book
    if (!session) {
      toast.info("Please log in to borrow this book")
      router.push(`/login?redirect=${encodeURIComponent(`/books/${bookId}`)}`)
      return
    }

    setLoading(true)
    try {
      const token = await getAuthToken()
      const borrow = await borrowBook(token, { bookId, days })
      toast.success(
        `Book borrowed! Please return it by ${formatDate(borrow.dueDate)}.`
      )
      onBorrowed()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 rounded-xl border bg-card p-5">
      <div>
        <p className="mb-2 text-sm font-medium">Borrow for</p>
        <div className="flex gap-2">
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              disabled={notAvailable}
              onClick={() => setDays(d)}
              className={cn(
                "cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                days === d
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {d} days
            </button>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full cursor-pointer"
        disabled={notAvailable || loading}
        onClick={handleBorrow}
      >
        {notAvailable ? "Not Available" : loading ? "Borrowing..." : "Borrow"}
      </Button>
    </div>
  )
}
