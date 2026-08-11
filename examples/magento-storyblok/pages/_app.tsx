import { FramerNextPages } from '@graphcommerce/framer-next-pages'
import { GraphQLProvider } from '@graphcommerce/graphql'
import { GlobalHead } from '@graphcommerce/magento-store'
import { CssAndFramerMotionProvider, PageLoadIndicator } from '@graphcommerce/next-ui'
import { usePreventEditorNavigation } from '@graphcommerce/storyblok-ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { theme } from '../components/theme'
import { I18nProvider } from '../lib/i18n/I18nProvider'

export { getStoryblokApi } from '../lib/storyblok'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en' } = router

  // Stop link navigation while the page is loaded inside the Storyblok Visual
  // Editor iframe so clicking a blok opens the field editor instead of
  // following the link. Attached at app-level so it covers every page,
  // including overlays which don't render the GlobalConfigProvider.
  usePreventEditorNavigation()

  return (
    <CssAndFramerMotionProvider {...props}>
      <I18nProvider key={locale} locale={locale}>
        <GraphQLProvider {...props}>
          <ThemeProvider theme={theme}>
            <GlobalHead />
            <CssBaseline />
            <PageLoadIndicator />
            <FramerNextPages {...props} />
          </ThemeProvider>
        </GraphQLProvider>
      </I18nProvider>
    </CssAndFramerMotionProvider>
  )
}
