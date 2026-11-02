import { cn } from "@/lib/utils"

// Consistent section heading used across all pages
export function SectionHeading({
  children,
  className,
  subtitle,
}: {
  children: React.ReactNode
  className?: string
  subtitle?: string
}) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
        {children}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
