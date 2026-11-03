// Turn an ISO date string into something like "Nov 3, 2026"
export function formatDate(iso?: string | null) {
  if (!iso) return "-"
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// True when the due date is in the past
export function isOverdue(dueDate: string) {
  return new Date(dueDate).getTime() < Date.now()
}
