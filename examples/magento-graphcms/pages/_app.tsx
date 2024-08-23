import { FramerNextPages } from '@graphcommerce/framer-next-pages'
import { GraphQLProvider } from '@graphcommerce/graphql'
import { GlobalHead } from '@graphcommerce/magento-store'
import { CssAndFramerMotionProvider, PageLoadIndicator } from '@graphcommerce/next-ui'
import { CssBaseline, CssVarsProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { theme } from '../components/theme'
import { I18nProvider } from '../lib/i18n/I18nProvider'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en' } = router

  return (
    <CssAndFramerMotionProvider {...props}>
      <I18nProvider key={locale} locale={locale}>
        <GraphQLProvider {...props}>
          <CssVarsProvider theme={theme}>
            <GlobalHead />
            <CssBaseline />
            <PageLoadIndicator />
            <FramerNextPages {...props} />
          </CssVarsProvider>
        </GraphQLProvider>
      </I18nProvider>
    </CssAndFramerMotionProvider>
  )
}
