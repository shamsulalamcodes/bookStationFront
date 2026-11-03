"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { toast } from "sonner"
import { BookGrid } from "@/components/books/BookGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Spinner } from "@/components/shared/Spinner"
import { Input } from "@/components/ui/input"
import { getAllBooks, type Book } from "@/lib/api"
import { CATEGORIES } from "@/lib/categories"
import { cn } from "@/lib/utils"

function AllBooks() {
  const searchParams = useSearchParams()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  )

  useEffect(() => {
    getAllBooks()
      .then(setBooks)
      .catch((err) => toast.error(err.message || "Could not load books"))
      .finally(() => setLoading(false))
  }, [])

  // Filter by category and by title/author text
  const visibleBooks = useMemo(() => {
    const text = search.trim().toLowerCase()
    return books.filter((book) => {
      const matchCategory = category === "All" || book.category === category
      const matchText =
        !text ||
        book.title.toLowerCase().includes(text) ||
        book.author.toLowerCase().includes(text)
      return matchCategory && matchText
    })
  }, [books, search, category])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading subtitle="Browse the whole library and find your next read.">
        All Books
      </SectionHeading>

      <div className="relative mx-auto mb-6 max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <BookGrid
        books={visibleBooks}
        loading={loading}
        emptyMessage="No books match your search."
      />
    </section>
  )
}

// useSearchParams needs a Suspense boundary in the App Router
export default function AllBooksPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AllBooks />
    </Suspense>
  )
}
