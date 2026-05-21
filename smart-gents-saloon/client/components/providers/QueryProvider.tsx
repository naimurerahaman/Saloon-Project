'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:            60 * 1000,  // 1 min — avoid flash on navigation
        gcTime:               5 * 60 * 1000,
        retry:                1,
        refetchOnWindowFocus: false,
      },
    },
  })
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState ensures a new QueryClient per SSR request (not shared across requests)
  const [queryClient] = useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        theme="dark"
        position="top-right"
        richColors
        toastOptions={{
          style: {
            background:  '#141414',
            border:      '1px solid rgba(255,255,255,0.08)',
            color:       '#f5f5f5',
            fontFamily:  'var(--font-inter, sans-serif)',
          },
          classNames: {
            title:       'text-sm font-semibold',
            description: 'text-xs text-white/55',
          },
        }}
      />
    </QueryClientProvider>
  )
}
