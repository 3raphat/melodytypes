import { cleanEnv, str } from 'envalid'
import { type NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

const env = cleanEnv(process.env, {
  SPOTIFY_CLIENT_ID: str(),
  SPOTIFY_CLIENT_SECRET: str(),
})

const scopes = ['user-read-email', 'user-read-private', 'user-top-read']

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(
        ','
      )}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token!
        token.refreshToken = account.refresh_token!
        token.expires_at = account.expires_at!
      }

      if (Date.now() < token.expiresAt) {
        return token
      }

      const url = 'https://accounts.spotify.com/api/token'

      const buffer = Buffer.from(
        env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET
      ).toString('base64')

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${buffer}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken,
        }),
      })

      const data = await res.json()

      token.accessToken = data.access_token

      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken

      return session
    },
  },
}
