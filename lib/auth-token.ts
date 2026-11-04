import { authClient } from "@/lib/auth-client"

// Get a fresh JWT from BetterAuth right before calling a protected API.
// We never store it, so it can't be stolen from localStorage or go stale.
export async function getAuthToken(): Promise<string> {
  const { data, error } = await authClient.token()
  console.log(error?.message ?? "Your session expired...")
  if (error || !data?.token) {
    throw new Error("Your session expired. Please log in again.")
  }
  return data.token
}
