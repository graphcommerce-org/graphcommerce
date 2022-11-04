import { FramerNextPages } from '@graphcommerce/framer-next-pages'
import { GoogleRecaptchaProvider } from '@graphcommerce/googlerecaptcha'
// import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
import { GlobalHead } from '@graphcommerce/magento-store'
import {
  CssAndFramerMotionProvider,
  DarkLightModeThemeProvider,
  PageLoadIndicator,
} from '@graphcommerce/next-ui'
import { CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import { lightTheme, darkTheme } from '../components/theme'
import { GraphQLProvider } from '../lib/graphql/GraphQLProvider'
import { I18nProvider } from '../lib/i18n/I18nProvider'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en' } = router

  return (
    <CssAndFramerMotionProvider>
      <I18nProvider key={locale} locale={locale}>
        <GraphQLProvider {...props}>
          <DarkLightModeThemeProvider light={lightTheme} dark={darkTheme}>
            <GlobalHead />
            <CssBaseline />
            <PageLoadIndicator />
            <GoogleRecaptchaProvider>
              <FramerNextPages {...props} />
            </GoogleRecaptchaProvider>
          </DarkLightModeThemeProvider>
        </GraphQLProvider>
      </I18nProvider>
    </CssAndFramerMotionProvider>
  )
}
