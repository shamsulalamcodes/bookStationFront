import Link from "next/link"
import { BookCover } from "@/components/shared/BookCover"
import { formatDate } from "@/lib/format"
import type { Borrow } from "@/lib/api"
import { useSession } from "@/hooks/useSession"
import { Button } from "../ui/button"

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
  const { data: session } = useSession()
  const user = session?.user?.name

  return (
    <article className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm">
      <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-36 sm:w-28">
        <BookCover
          src={borrow?.image}
          alt={borrow?.title ?? "Book"}
          className="h-full w-full"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">

        {borrow ? (
          <Link
            href={`/books/${borrow._id}`}
            className="line-clamp-1 text-lg font-semibold hover:underline"
          >
            {borrow?.title}
          </Link>
        ) : (
          <p className="text-lg font-semibold">This book is no longer listed</p>
        )}
        {borrow && (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            by {user}
          </p>
        )}

        <dl className="mt-1 space-y-0.5 text-sm text-muted-foreground">
          <div>Borrowed: {formatDate(borrow.borrowDate)}</div>
          {borrow?.resultDate && (
            <div>To be returned by: {formatDate(borrow?.resultDate)}</div>
          )}
        </dl>
      </div>
      <div className="">
        <Button variant='destructive' size="lg" disabled={returning} onClick={() => onReturn(borrow._id)}>
          Return
        </Button>
      </div>
    </article>
  )
}
