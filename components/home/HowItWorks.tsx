import { BookOpenCheck, RotateCcw, Search } from "lucide-react"
import { SectionHeading } from "@/components/shared/SectionHeading"

const steps = [
  {
    icon: Search,
    title: "1. Find a Book",
    text: "Browse the library by title, author, or category and open any book to see its details.",
  },
  {
    icon: BookOpenCheck,
    title: "2. Borrow It",
    text: "Log in, choose 3, 7, or 14 days, and tap Borrow. We track your due date for you.",
  },
  {
    icon: RotateCcw,
    title: "3. Return It",
    text: "Done reading? Return the book from My Borrows so the next reader can enjoy it.",
  },
]

// Static section: explains the borrowing flow
export function HowItWorks() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading subtitle="Three simple steps from shelf to reading chair.">
          How Borrowing Works
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex h-full flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <step.icon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
