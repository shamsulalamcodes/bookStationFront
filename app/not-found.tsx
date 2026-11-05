import Link from "next/link"
import { BookOpen, Home, Library } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/categories"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found | BookStation",
}

// Shown for any unknown URL, and whenever notFound() is called
export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Soft glows behind the content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-8 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-8 bottom-4 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[70vh] max-w-2xl animate-in flex-col items-center justify-center px-4 py-20 text-center duration-500 fade-in slide-in-from-bottom-4">
        {/* Big 404 with a book icon */}
        <div className="relative">
          <span className="bg-gradient-to-br from-indigo-600 to-amber-500 bg-clip-text text-8xl font-extrabold text-transparent sm:text-9xl">
            404
          </span>
          <BookOpen className="absolute -top-3 -right-8 h-10 w-10 rotate-12 text-amber-500 sm:-right-10 sm:h-12 sm:w-12" />
        </div>

        <h1 className="mt-4 text-3xl font-bold text-indigo-700 dark:text-indigo-300">
          This page is missing from our shelves
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you are looking for may have been moved, removed, or never
          existed. Let&apos;s get you back to something good to read.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/books"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            <Library className="h-4 w-4" />
            Browse Books
          </Link>
        </div>
      </div>
    </section>
  )
}
