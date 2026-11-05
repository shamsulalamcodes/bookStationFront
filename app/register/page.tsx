"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { BookOpen, Mail, Lock, User, ImageIcon } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // Validate password: at least 1 uppercase, 1 lowercase, min 6 chars
  function validatePassword(pw: string): string {
    if (pw.length < 6) return "Password must be at least 6 characters"
    if (!/[A-Z]/.test(pw)) return "Password must have at least one uppercase letter"
    if (!/[a-z]/.test(pw)) return "Password must have at least one lowercase letter"
    return ""
  }

  async function uploadImage(): Promise<string | null> {
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

  // Handle registration
  async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const image = await uploadImage()

    // Validate password before submitting
    const pwError = validatePassword(password)
    if (pwError) {
      setPasswordError(pwError)
      return
    }
    setPasswordError("")
    setLoading(true)

    try {
      const result = await authClient.signUp.email({ name, email, password, image: image ?? undefined })
      if (result?.error) {
        toast.error(result?.error.message || "Registration failed")
      } else {
        toast.success("Account created! Please sign in.")
        router.push("/login")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Google signup
  async function handleGoogleSignup() {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })
    } catch {
      toast.error("Google sign-up failed. Please try again.")
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-indigo-700 dark:text-indigo-300">
            Create Account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Join BookStation and start exploring
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="space-y-2">
            <Label htmlFor="photo">Upload Image</Label>
            <div className="relative">
              <ImageIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="photo"
                type="file"
                accept="image/*"
                placeholder="Book Cover"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  // Clear error when user types
                  if (passwordError) setPasswordError("")
                }}
                className="pl-10"
                required
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {passwordError}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Must contain at least one uppercase, one lowercase, and 6+
              characters
            </p>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
            size="lg"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignup}
          className="w-full cursor-pointer"
          size="lg"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
