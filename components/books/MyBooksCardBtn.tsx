"use client"

import { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { authClient } from "@/lib/auth-client"
import { getAuthToken } from "@/lib/auth-token"
import { updateBook, type Book } from "@/lib/api"
import { CATEGORIES } from "@/lib/categories"
import { uploadImage } from "@/lib/utils"

const fieldClass =
    "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

const MyBooksCardBtn = ({
    book,
    onUpdated,
}: {
    book: Book
    onUpdated?: () => void // lets the page reload its list
}) => {
    const { data: session } = authClient.useSession()
    const router = useRouter()
    const uid = useId()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState<File | null>(null)

    // Start the form with the book's current values
    const startValues = {
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        totalCopies: String(book.totalCopies),
    }
    const [form, setForm] = useState(startValues)

    function update(field: keyof typeof form, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    // Reset the form every time the dialog opens
    function handleOpenChange(next: boolean) {
        if (next) {
            setForm(startValues)
            setPhoto(null)
        }
        setOpen(next)
    }

    async function onUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!session) {
            toast.info(`{Please log in to update ${book.title}}`)
            router.push("/login")
            return
        }

        const totalCopies = Number(form.totalCopies)
        if (!Number.isInteger(totalCopies) || totalCopies < 1) {
            toast.error("Total copies must be a whole number of 1 or more")
            return
        }

        setLoading(true)
        try {
            // Upload a new cover only if the user chose one
            let image = book.image
            if (photo) {
                const url = await uploadImage(photo)
                if (!url) {
                    toast.error("Image upload failed")
                    return // the finally block turns loading off
                }
                image = url
            }

            const token = await getAuthToken()
            const result = await updateBook(token, {
                _id: book._id, ...form, totalCopies, image
            })
            setOpen(false)
            onUpdated?.()
            if (result.modifiedCount > 0) {
                toast.success("Book updated successfully")
            } else {
                toast.info("No changes to save")
            }
            window.location.reload()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Could not update book")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button variant="outline" />}>Update</DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update {book.title}</DialogTitle>
                    <DialogDescription>Change the details below and save.</DialogDescription>
                </DialogHeader>

                <form onSubmit={onUpdate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`${uid}-title`}>Title</Label>
                        <Input id={`${uid}-title`} value={form.title}
                            onChange={(e) => update("title", e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${uid}-author`}>Author</Label>
                        <Input id={`${uid}-author`} value={form.author}
                            onChange={(e) => update("author", e.target.value)} required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`${uid}-category`}>Category</Label>
                            <select id={`${uid}-category`} value={form.category}
                                onChange={(e) => update("category", e.target.value)} className={fieldClass}>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat} className="bg-background text-foreground">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`${uid}-copies`}>Total Copies</Label>
                            <Input id={`${uid}-copies`} type="number" min={1} step={1}
                                value={form.totalCopies}
                                onChange={(e) => update("totalCopies", e.target.value)} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${uid}-image`}>New Cover Image</Label>
                        <div className="relative">
                            <ImageIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input id={`${uid}-image`} type="file" accept="image/*"
                                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} className="pl-10" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Leave empty to keep the current cover.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${uid}-description`}>Description</Label>
                        <textarea id={`${uid}-description`} rows={5} value={form.description}
                            onChange={(e) => update("description", e.target.value)}
                            className={fieldClass} required />
                    </div>

                    <Button type="submit" size="lg" variant="ghost" className="w-full cursor-pointer" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default MyBooksCardBtn