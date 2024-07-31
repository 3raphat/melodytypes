import "~/styles/globals.css"

import { type Metadata } from "next"
import { Inter } from "next/font/google"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "next-themes"

import { TRPCReactProvider } from "~/trpc/react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "MelodyTypes",
  description: "Explore your MBTI personality type through music",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <NextUIProvider>
            <ThemeProvider attribute="class" enableSystem defaultTheme="system">
              {children}
            </ThemeProvider>
          </NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
