import { toast } from "sonner"

export { cn } from "cn"


export async function uploadImage(photo: File | null): Promise<string | null> {
    if (!photo) {
        toast.error("Please choose a cover image")
        return null
    }

    const formData = new FormData()
    formData.append("image", photo) // photo is now a File here, so no error

    try {
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
            { method: "POST", body: formData }
        )
        const result = await response.json()

        if (!result.success) {
            toast.error("Image upload failed")
            return null
        }
        const image = result.data.url
        return image as string
    } catch {
        toast.error("Could not reach the image server. Check your internet.")
        return null
    }
}