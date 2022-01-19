import { FramerNextPages } from '@graphcommerce/framer-next-pages'
// import { GoogleAnalyticsScript } from '@graphcommerce/googleanalytics'
// import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
// import { GoogleTagManagerScript } from '@graphcommerce/googletagmanager'
import { GlobalHead } from '@graphcommerce/magento-store'
import { CssAndFramerMotionProvider, PageLoadIndicator } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { lightTheme, darkTheme } from '../components'
import { GraphQLProvider } from '../lib/graphql/GraphQLProvider'
import { I18nProvider } from '../lib/i18n/I18nProvider'

export default function ThemedApp(props: AppProps) {
  const { router } = props
  const { locale = 'en', asPath } = router

  // Hack for the demo to allow using darkmode without any fancy darkmode toggles
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    setDarkMode(asPath.includes('dark'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CssAndFramerMotionProvider>
      <I18nProvider key={locale} locale={locale}>
        <GraphQLProvider {...props}>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            {/* <GoogleAnalyticsScript /> */}
            {/* <GoogleRecaptchaV3Script /> */}
            {/* <GoogleTagManagerScript /> */}
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
