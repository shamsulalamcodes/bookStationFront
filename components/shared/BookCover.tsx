"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

// Book cover image with a friendly fallback when the image is missing or broken
export function BookCover({
  src,
  alt,
  className,
}: {
  src?: string
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-indigo-100 to-amber-100 dark:from-indigo-950 dark:to-slate-800",
          className
        )}
      >
        <BookOpen className="h-10 w-10 text-indigo-400" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      // Open Library sends a 1px placeholder when it has no cover
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 1) setFailed(true)
      }}
      className={cn("object-cover", className)}
    />
  )
}
