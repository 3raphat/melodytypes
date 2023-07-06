import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MelodyTypes',
  description: 'MelodyTypes: Discover Your Inner Harmony',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
