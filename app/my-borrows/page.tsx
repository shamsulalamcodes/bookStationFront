"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { BorrowCard } from "@/components/borrows/BorrowCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Spinner } from "@/components/shared/Spinner"
import { getMyBorrows, returnBook, type Borrow } from "@/lib/api"
import { getAuthToken } from "@/lib/auth-token"

function MyBorrows() {
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
        // Show books still borrowed first
        data.sort(
          (a, b) =>
            Number(b.status === "Borrowed") - Number(a.status === "Borrowed")
        )
        if (!cancelled) setBorrows(data)
      })
      .catch((err) => toast.error(err.message || "Could not load borrows"))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  async function handleReturn(borrowId: string) {
    setReturningId(borrowId)
    try {
      const token = await getAuthToken()
      await returnBook(token, borrowId)
      toast.success("Book returned. Thank you!")
      setReloadKey((k) => k + 1) // reload so the list matches the database
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return book")
    } finally {
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
