import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookCover } from "@/components/shared/BookCover"
import { formatDate, isOverdue } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Borrow } from "@/lib/api"

// One row in "My Borrows": cover, dates, status badge and Return button
export function BorrowCard({
  borrow,
  onReturn,
  returning,
}: {
  borrow: Borrow
  onReturn: (borrowId: string) => void
  returning: boolean
}) {
  const book = borrow.bookId // the backend sends the full book here
  const isBorrowed = borrow.status === "Borrowed"
  const overdue = isBorrowed && isOverdue(borrow.dueDate)

  return (
    <article className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm">
      <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-36 sm:w-28">
        <BookCover
          src={book?.image}
          alt={book?.title ?? "Book"}
          className="h-full w-full"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
              isBorrowed
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
            )}
          >
            {borrow.status}
          </span>
          {overdue && (
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-300">
              Overdue
            </span>
          )}
        </div>

        {book ? (
          <Link
            href={`/books/${book._id}`}
            className="line-clamp-1 text-lg font-semibold hover:underline"
          >
            {book.title}
          </Link>
        ) : (
          <p className="text-lg font-semibold">This book is no longer listed</p>
        )}
        {book && (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            by {book.author}
          </p>
        )}

        <dl className="mt-1 space-y-0.5 text-sm text-muted-foreground">
          <div>Borrowed: {formatDate(borrow.borrowDate)}</div>
          <div>Due: {formatDate(borrow.dueDate)}</div>
          {borrow.returnDate && (
            <div>Returned: {formatDate(borrow.returnDate)}</div>
          )}
        </dl>

        {isBorrowed && (
          <div className="mt-auto pt-2">
            <Button
              className="cursor-pointer"
              disabled={returning}
              onClick={() => onReturn(borrow._id)}
            >
              {returning ? "Returning..." : "Return Book"}
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}
