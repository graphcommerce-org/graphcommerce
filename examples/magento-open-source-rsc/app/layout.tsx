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
 * Note: We don't import from @graphcommerce/next-ui/server because it re-exports modules that use
 * next/router which is incompatible with RSC. TODO: Create RSC-compatible utility exports in the
 * packages.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>{children}</body>
    </html>
  )
}
