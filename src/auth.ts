import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/gmail.send',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign-in: store tokens on the JWT
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        return token
      }

      // Token still valid — return as-is
      const expiresAtSeconds = typeof token.expiresAt === 'number' ? token.expiresAt : 0
      if (expiresAtSeconds && Date.now() < expiresAtSeconds * 1000) {
        return token
      }

      // Access token expired — attempt refresh
      if (!token.refreshToken) {
        return token
      }

      try {
        const params = new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken as string,
        })

        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        })

        const refreshedTokens = await response.json() as {
          access_token?: string
          expires_in?: number
          refresh_token?: string
          error?: string
        }

        if (!response.ok) {
          throw new Error(refreshedTokens.error ?? 'Failed to refresh access token')
        }

        token.accessToken = refreshedTokens.access_token
        token.expiresAt =
          Math.floor(Date.now() / 1000) +
          (typeof refreshedTokens.expires_in === 'number' ? refreshedTokens.expires_in : 3600)

        if (refreshedTokens.refresh_token) {
          token.refreshToken = refreshedTokens.refresh_token
        }

        return token
      } catch (err) {
        console.error('Token refresh error:', err)
        token.accessToken = undefined
        return token
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})
