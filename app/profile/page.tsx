"use client"

import { AuthGuard } from "@/components/auth/AuthGuard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { useSession } from "@/hooks/useSession"
import { formatDate } from "@/lib/format"

function Profile() {
  const { data: session } = useSession()
  const user = session?.user
  if (!user) return null

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <SectionHeading>My Profile</SectionHeading>

      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center shadow-sm">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100 text-4xl font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Member since {formatDate(String(user.createdAt))}
        </p>
      </div>
    </section>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <Profile />
    </AuthGuard>
  )
}
