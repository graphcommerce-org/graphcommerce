import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'GraphCommerce',
  description: 'GraphCommerce Magento Open Source - App Router',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

type RootLayoutProps = {
  children: React.ReactNode
}

/**
 * Root layout for the App Router This is a minimal RSC layout that sets up the HTML document
 *
 * AppRouterCacheProvider MUST be in the root Server Component layout (not in a 'use client'
 * component) to properly collect CSS during SSR streaming. This ensures styles are in the initial
 * HTML even with JS disabled. See: https://mui.com/material-ui/integrations/nextjs/#app-router
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
