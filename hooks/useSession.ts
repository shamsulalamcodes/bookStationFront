"use client"

import { authClient } from "@/lib/auth-client"

// Hook to access the current user session in client components
// Returns { data: session, isPending, error }
export function useSession() {
  return authClient.useSession()
}
