"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { BookGrid } from "@/components/books/BookGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { getMyBooks, type Book } from "@/lib/api"
import { getAuthToken } from "@/lib/auth-token"

function MyBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAuthToken()
      .then(getMyBooks)
      .then(setBooks)
      .catch(() => toast.error("Could not load your books"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading subtitle="Books you have added to the library.">
        My Books
      </SectionHeading>
      <BookGrid
        from={true}
        books={books}
        loading={loading}
        emptyMessage="You have not added any books yet. Use Add Book to share your first one."
      />
    </section>
  )
}

export default function MyBooksPage() {
  return (
    <AuthGuard>
      <MyBooks />
    </AuthGuard>
  )
}
