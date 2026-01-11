'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { LayoutQuery } from '../graphql/Layout.gql'
import { ApolloWrapper } from '../lib/apollo/ApolloWrapper'
import { I18nProvider } from '../lib/i18n/I18nProvider'
import type { GraphCommerceStorefrontConfig } from '../lib/storefront'
import { CssAndFramerMotionProviderRsc } from './CssAndFramerMotionProviderRsc'
import { theme } from './theme'

// Layout Context for passing server-fetched layout data to client components
const LayoutContext = createContext<LayoutQuery | undefined>(undefined)

export function useLayoutData() {
  const ctx = useContext(LayoutContext)
  // Return empty object if context is undefined (during initial render)
  return ctx ?? {}
}

type ProvidersProps = {
  children: ReactNode
  storefront: GraphCommerceStorefrontConfig
  layoutData?: LayoutQuery
}

/**
 * Client-side providers wrapper for the App Router Combines all necessary context providers in one
 * component
 *
 * Note: AppRouterCacheProvider is in the root layout.tsx (Server Component) to properly collect CSS
 * during SSR. We use CssAndFramerMotionProviderRsc which does NOT wrap with EmotionProvider because
 * AppRouterCacheProvider already provides the Emotion CacheProvider.
 */
export function Providers({ children, storefront, layoutData }: ProvidersProps) {
  return (
    <CssAndFramerMotionProviderRsc>
      <I18nProvider locale={storefront.linguiLocale ?? storefront.locale}>
        <ApolloWrapper storefront={storefront}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LayoutContext.Provider value={layoutData}>{children}</LayoutContext.Provider>
          </ThemeProvider>
        </ApolloWrapper>
      </I18nProvider>
    </CssAndFramerMotionProviderRsc>
  )
}
