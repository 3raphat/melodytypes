import { type JWT } from 'next-auth/jwt'

import 'next-auth'

import { type User } from 'next-auth'

declare module 'next-auth' {
  interface Session extends User {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
}
