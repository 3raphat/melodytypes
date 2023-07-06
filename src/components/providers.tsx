'use client'

import { ReactNode } from 'react'

import { CacheProvider } from '@chakra-ui/next-js'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

import theme from '@/styles/theme'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Box minH='100vh'>{children}</Box>
          </SessionProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
