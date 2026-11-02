import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

// BetterAuth catch-all route handler — handles login, register, session, etc.
export const { GET, POST } = toNextJsHandler(auth)
