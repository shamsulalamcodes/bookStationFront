import Link from "next/link"
import { UserRound, Briefcase, Baby, Library, WandSparkles, Landmark, Feather, Fingerprint } from "lucide-react"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { getCategories } from "@/lib/api";

// Static section: quick links to popular categories
const data = async (): Promise<string[]> => await getCategories();

export async function TopCategories() {
  const categories = await data();
  console.log("cat ", categories);
  const category = [
    { name: categories[0], icon: UserRound },
    { name: categories[1], icon: Briefcase },
    { name: categories[2], icon: Baby },
    { name: categories[3], icon: Library },
    { name: categories[4], icon: WandSparkles },
    { name: categories[5], icon: Landmark },
    { name: categories[6], icon: Feather },
    { name: categories[7], icon: Fingerprint },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading subtitle="Jump straight into the kind of story you love.">
        Top Categories
      </SectionHeading>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {
          category.map((cat) => (
            <Link
              key={cat.name}
              href={`/books?category=${encodeURIComponent(cat.name)}`}
              className="flex h-32 flex-col items-center justify-center gap-3 rounded-xl border bg-card p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <cat.icon className="h-8 w-8 text-amber-500" />
              <span className="font-medium">{cat.name}</span>
            </Link>
          ))
        }
      </div>
    </section>
  )
}
