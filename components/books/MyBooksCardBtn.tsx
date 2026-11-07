import { Button } from "../ui/button"
import { getAuthToken } from "@/lib/auth-token"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Book } from "@/lib/api"
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useId, useState } from "react"
import { CATEGORIES } from "@/lib/categories"
import { uploadImage } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

const MyBooksCardBtn = ({ book }: { book: Book }) => {

    const { data: session } = authClient.useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState<File | null>(null)
    const uid = useId()
    const [form, setForm] = useState({
        title: "", author: "", category: CATEGORIES[0], image: "", description: "", totalCopies: "1",
    })

    const fieldClass =
        "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

    function update(field: keyof typeof form, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const { author, category, description, image, title, totalCopies } = book

    const onUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const imagee = await uploadImage(photo) as string

        if (!session) {
            toast.info("Please log in to borrow this book")
            router.push(`/login`)
            return
        }
        try {
            const token = await getAuthToken()
            // const borrow = await borrowBook(token, { ...book, resultDate, borrowDate })
            toast.success(`Book Updated Successfully.`)
            router.push('/my-books')
        } catch (err) { toast.error(err instanceof Error ? err.message : "Could not borrow book") } finally { }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger render={<Button variant="destructive" />}>
                    Update
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update {title}</DialogTitle>
                        <DialogDescription>
                            Change the details below and save.
                        </DialogDescription>
                    </DialogHeader>

                    {/* The form sits OUTSIDE DialogHeader and DialogDescription */}
                    <form onSubmit={onUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`${uid}-title`}>Title</Label>
                            <Input
                                id={`${uid}-title`}
                                value={title}
                                onChange={(e) => update("title", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`${uid}-author`}>Author</Label>
                            <Input
                                id={`${uid}-author`}
                                value={author}
                                onChange={(e) => update("author", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor={`${uid}-category`}>Category</Label>
                                <select
                                    id={`${uid}-category`}
                                    value={category}
                                    onChange={(e) => update("category", e.target.value)}
                                    className={fieldClass}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-background text-foreground">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`${uid}-copies`}>Total Copies</Label>
                                <Input
                                    id={`${uid}-copies`}
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={totalCopies}
                                    onChange={(e) => update("totalCopies", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`${uid}-image`}>New Cover Image</Label>
                            <div className="relative">
                                <ImageIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id={`${uid}-image`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                                    className="pl-10"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Leave empty to keep the current cover.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`${uid}-description`}>Description</Label>
                            <textarea
                                id={`${uid}-description`}
                                rows={5}
                                value={description}
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
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyBooksCardBtn;