// Skeleton loader that matches the BookCard layout
export function BookCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border bg-card">
      {/* Image placeholder */}
      <div className="aspect-[4/3] w-full bg-muted" />
      {/* Content placeholder */}
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-9 w-full rounded-lg bg-muted" />
      </div>
    </div>
  )
}
