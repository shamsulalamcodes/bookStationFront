import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

// BetterAuth client-side instance — use this in all client components
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? window.location.origin
    : process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
})
