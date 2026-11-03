// Only allow redirects to pages inside this site (starts with a single "/")
// This stops links like /login?redirect=https://evil.com
export function safeRedirect(path: string | null | undefined) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/"
  return path
}
