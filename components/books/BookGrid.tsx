import { BookOpen } from "lucide-react"
import { BookCardSkeleton } from "@/components/shared/BookCardSkeleton"
import type { Book } from "@/lib/api"
// import MyBooksCard from "./MyBooksCard"
import { BookCard } from "./BookCard"
import MyBooksCard from "./MyBooksCard"

// Grid of book cards with loading and empty states
export function BookGrid({
  books,
  from,
  loading = false,
  emptyMessage = "No books found.",
  skeletonCount = books.length || 4,
}: {
  from: boolean,
  books: Book[]
  loading?: boolean
  emptyMessage?: string
  skeletonCount?: number
}) {

  const gridClass = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

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
    <div>
      {
        from ?
          <div className="">
            {books.map(book => <MyBooksCard book={book} key={book._id} />)}
          </div>
          :
          <div className={gridClass}>
            {books.map(book => <BookCard book={book} key={book._id} />)}
          </div>
      }
    </div>
  )
}
