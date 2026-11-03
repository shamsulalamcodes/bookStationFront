import { BookOpen } from "lucide-react"
import { BookCard } from "@/components/books/BookCard"
import { BookCardSkeleton } from "@/components/shared/BookCardSkeleton"
import type { Book } from "@/lib/api"

// Grid of book cards with loading and empty states
export function BookGrid({
  books,
  loading = false,
  emptyMessage = "No books found.",
  skeletonCount = 8,
}: {
  books: Book[]
  loading?: boolean
  emptyMessage?: string
  skeletonCount?: number
}) {
  const gridClass =
    "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
        <BookOpen className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  )
}
