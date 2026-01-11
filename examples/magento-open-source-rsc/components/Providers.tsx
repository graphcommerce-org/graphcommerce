'use client'

import { CssAndFramerMotionProvider } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ApolloWrapper } from '../lib/apollo/ApolloWrapper'
import { I18nProvider } from '../lib/i18n/I18nProvider'
import type { GraphCommerceStorefrontConfig } from '../lib/storefront'
import { StorefrontProvider } from '../lib/storefront/StorefrontProvider'
import { theme } from './theme'

type ProvidersProps = {
  children: React.ReactNode
  storefront: GraphCommerceStorefrontConfig
}

/**
 * Client-side providers wrapper for the App Router Combines all necessary context providers in one
 * component
 */
export function Providers({ children, storefront }: ProvidersProps) {
  return (
    <StorefrontProvider storefront={storefront}>
      <CssAndFramerMotionProvider>
        <I18nProvider locale={storefront.linguiLocale ?? storefront.locale}>
          <ApolloWrapper storefront={storefront}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </ApolloWrapper>
        </I18nProvider>
      </CssAndFramerMotionProvider>
    </StorefrontProvider>
  )
}
