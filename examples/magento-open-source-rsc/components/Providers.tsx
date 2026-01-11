'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { ReactNode } from 'react'
import { ApolloWrapper } from '../lib/apollo/ApolloWrapper'
import { I18nProvider } from '../lib/i18n/I18nProvider'
import type { GraphCommerceStorefrontConfig } from '../lib/storefront'
import { CssAndFramerMotionProviderRsc } from './CssAndFramerMotionProviderRsc'
import { theme } from './theme'

type ProvidersProps = {
  children: ReactNode
  storefront: GraphCommerceStorefrontConfig
}

/**
 * Client-side providers wrapper for the App Router. Combines all necessary context providers in one
 * component.
 *
 * Note: Layout data (menu, cms blocks) is fetched server-side in layout.tsx and passed directly to
 * LayoutNavigation. Apollo Client's cache handles data sharing between components - no custom
 * context needed.
 */
export function Providers({ children, storefront }: ProvidersProps) {
  return (
    <CssAndFramerMotionProviderRsc>
      <I18nProvider locale={storefront.linguiLocale ?? storefront.locale}>
        <ApolloWrapper storefront={storefront}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ApolloWrapper>
      </I18nProvider>
    </CssAndFramerMotionProviderRsc>
  )
}
