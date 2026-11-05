"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addBook } from "@/lib/api"
import { getAuthToken } from "@/lib/auth-token"
import { CATEGORIES } from "@/lib/categories"
import { authClient } from "@/lib/auth-client"

const fieldClass =
  "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

function AddBookForm() {

  const { data: session } = authClient.useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: CATEGORIES[0],
    image: "",
    description: "",
    totalCopies: "1",
  })

  // Update one field at a time
  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const totalCopies = Number(form.totalCopies)
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be a whole number of 1 or more")
      return
    }

    setLoading(true)
    try {
      const token = await getAuthToken()
      await addBook(token, {
        ...form,
        totalCopies,
        availableCopies: totalCopies, // a new book starts fully available
        addedBy: {
          name: session?.user?.name || "Unknown",
          email: session?.user?.email || 'Unknown'
        },
      })
      toast.success("Book added successfully!")
      router.push("/my-books")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <SectionHeading subtitle="Share a book with the BookStation community.">
        Add a Book
      </SectionHeading>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-card p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={form.author}
            onChange={(e) => update("author", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={fieldClass}
            >
              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-background text-foreground"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalCopies">Total Copies</Label>
            <Input
              id="totalCopies"
              type="number"
              min={1}
              step={1}
              value={form.totalCopies}
              onChange={(e) => update("totalCopies", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Cover Image URL</Label>
          <Input
            id="image"
            type="url"
            defaultValue="https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png"
            placeholder="https://..."
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={fieldClass}
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </section>
  )
}

export default function AddBookPage() {
  return (
    <AuthGuard>
      <AddBookForm />
    </AuthGuard>
  )
}
