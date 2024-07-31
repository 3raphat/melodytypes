import {
  getServerSession,
  type Account,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth"
import type { JWT } from "next-auth/jwt"
import SpotifyProvider from "next-auth/providers/spotify"

import { env } from "~/env"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string
      email: string
      emailVerified: Date
      image: string
      access_token: string
      token_type: string
      expires_at: number
      expires_in: number
      refresh_token: string
      scope: string
      id: string
    } & DefaultSession["user"]
    error: string
  }

  interface User {
    name: string
    email: string
    emailVerified: Date
    image: string
    access_token: string
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
    scope: string
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
    scope: string
    id: string
    error: string
  }
}

export async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch("https://accounts.spotify.com/authorize", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = (await response.json()) as {
      access_token: string
      token_type: string
      expires_at: number
      refresh_token: string
      scope: string
    }

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_at,
      expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1hr
  },
  // callbacks: {
  //   session: ({ session, token }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: token.sub,
  //     },
  //   }),
  // },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (!account) {
        return token
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId,
      } as JWT

      if (Date.now() < updatedToken.expires_at) {
        return refreshAccessToken(updatedToken)
      }

      return updatedToken
    },
    async session({ session, token }) {
      const user: User = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      }
      session.user = user
      session.error = token.error
      return session
    },
  },
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "user-read-email user-top-read",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/signin",
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
