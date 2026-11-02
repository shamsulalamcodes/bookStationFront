import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"
import { jwt } from "better-auth/plugins"

// Connect to MongoDB (used only by BetterAuth for user/session storage)
const client = new MongoClient(process.env.MONGOURL!)
const db = client.db()

// BetterAuth server-side configuration
export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // Email + password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Google OAuth login
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // JWT plugin so the frontend can send Bearer tokens to the backend API
  plugins: [jwt()],

  // Store user's name and image from registration or Google
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },
})
