import Link from "next/link"
import {
  Laptop,
  Lightbulb,
  Library,
  Rocket,
  Search,
  Smile,
  Sparkles,
  User,
} from "lucide-react"
import { SectionHeading } from "@/components/shared/SectionHeading"

// Static section: quick links to popular categories
const categories = [
  { name: "Fantasy", icon: Sparkles },
  { name: "Science Fiction", icon: Rocket },
  { name: "Mystery & Thriller", icon: Search },
  { name: "Classics", icon: Library },
  { name: "Self-Help", icon: Lightbulb },
  { name: "Technology", icon: Laptop },
  { name: "Biography", icon: User },
  { name: "Children", icon: Smile },
]

export function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading subtitle="Jump straight into the kind of story you love.">
        Top Categories
      </SectionHeading>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/books?category=${encodeURIComponent(cat.name)}`}
            className="flex h-32 flex-col items-center justify-center gap-3 rounded-xl border bg-card p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <cat.icon className="h-8 w-8 text-amber-500" />
            <span className="font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
