import { CacheProvider } from '@emotion/react'
import { FramerNextPages } from '@graphcommerce/framer-next-pages'
// import { GoogleAnalyticsScript } from '@graphcommerce/googleanalytics'
// import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
// import { GoogleTagManagerScript } from '@graphcommerce/googletagmanager'
import { AppProps, emotionCache, GlobalHead, PageLoadIndicator } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import React from 'react'
import { darkTheme } from '../components/Theme/ThemedProvider'

export default function ThemedApp(props: Omit<AppPropsType, 'pageProps'> & AppProps) {
  return (
    <LazyMotion
      features={async () => (await import('@graphcommerce/next-ui/Page/framerFeatures')).default}
      strict
    >
      {/* <GoogleAnalyticsScript /> */}
      {/* <GoogleRecaptchaV3Script /> */}
      {/* <GoogleTagManagerScript /> */}
      <CacheProvider value={emotionCache()}>
        <ThemeProvider theme={darkTheme}>
          <GlobalHead name='GraphCommerce docs' />
          <CssBaseline />
          <PageLoadIndicator />
          <FramerNextPages {...props} />
        </ThemeProvider>
      </CacheProvider>
    </LazyMotion>
  )
}
