/** Returns the NextAuth secret, preferring the v5 `AUTH_SECRET` env var. */
export function getAuthSecret(): string {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? ''
}
