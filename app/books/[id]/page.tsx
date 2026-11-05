"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { BorrowSection } from "@/components/books/BorrowSection"
import { BookCover } from "@/components/shared/BookCover"
import { Spinner } from "@/components/shared/Spinner"
import { buttonVariants } from "@/components/ui/button"
import { getBookById, type Book } from "@/lib/api"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getBookById(id)
      .then(setBook)
      .catch((err) => setError(err.message || "Book not found"))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner />

  if (error || !book) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <p className="mt-2 text-muted-foreground">
          {error || "This book does not exist."}
        </p>
        <Link
          href="/books"
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        >
          Back to All Books
        </Link>
      </div>
    )
  }

  const soldOut = book.availableCopies <= 0

  const bok = { bookId: book?._id, title: book?.title, image: book?.image }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/books"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all books
      </Link>

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl border bg-muted shadow-sm md:max-w-none">
          <BookCover
            src={book.image}
            alt={book.title}
            className="h-full w-full"
          />
        </div>

        <div className="space-y-5">
          <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
            {book.category}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
              {book.title}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              by {book.author}
            </p>
          </div>

          <p className="leading-relaxed">{book.description}</p>

          <dl className="grid grid-cols-2 gap-4 rounded-xl border bg-card p-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Available copies</dt>
              <dd
                className={cn(
                  "text-lg font-semibold",
                  soldOut && "text-red-600 dark:text-red-400"
                )}
              >
                {book.availableCopies} of {book.totalCopies}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Added on</dt>
              <dd className="text-lg font-semibold">
                {formatDate(book.createdAt)}
              </dd>
            </div>
          </dl>

          <BorrowSection
            book={bok}
            availableCopies={book.availableCopies}
            onBorrowed={() =>
              setBook((b) =>
                b ? { ...b, availableCopies: b.availableCopies - 1 } : b
              )
            }
          />
        </div>
      </div>
    </section>
  )
}
