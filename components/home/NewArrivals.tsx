"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { BookGrid } from "@/components/books/BookGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { buttonVariants } from "@/components/ui/button"
import { getLatestBooks, type Book } from "@/lib/api"

// Latest 6 books from the database, newest first
export function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestBooks()
      .then(setBooks)
      .catch((err) => toast.error(err.message || "Could not load new arrivals"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading subtitle="Fresh additions to our shelves, straight from the community.">
        New Arrivals
      </SectionHeading>

      <BookGrid
        books={books}
        loading={loading}
        skeletonCount={8}
        emptyMessage="No books have been added yet. Be the first to add one!"
      />

      <div className="mt-10 text-center">
        <Link href="/books" className={buttonVariants({ size: "lg" })}>
          See All Books
        </Link>
      </div>
    </section>
  )
}
