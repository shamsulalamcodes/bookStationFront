"use client"

import { useSession } from "@/hooks/useSession"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

// Wraps private pages — redirects to login if not authenticated
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Once loading is done, if no session → redirect to login
    if (!isPending && !session) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [isPending, session, router, pathname])

  // Show a centered spinner while checking auth
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  // If no session after loading, show nothing (redirect is happening)
  if (!session) {
    return null
  }

  return <>{children}</>
}
