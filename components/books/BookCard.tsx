import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { BookCover } from "@/components/shared/BookCover"
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/api"

// One book card. Every card has the same size, the button sits at the bottom.
export function BookCard({ book }: { book: Book }) {
  const soldOut = book.availableCopies <= 0

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <BookCover
          src={book.image}
          alt={book.title}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          by {book.author}
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            soldOut
              ? "text-red-600 dark:text-red-400"
              : "text-emerald-600 dark:text-emerald-400"
          )}
        >
          {soldOut
            ? "Not Available"
            : `${book.availableCopies} of ${book.totalCopies} available`}
        </p>

        <div className="mt-auto pt-3">
          <Link
            href={`/books/${book._id}`}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
