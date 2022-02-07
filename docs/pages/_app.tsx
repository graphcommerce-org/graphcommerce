import { FramerNextPages } from '@graphcommerce/framer-next-pages'
// import { GoogleAnalyticsScript } from '@graphcommerce/googleanalytics'
// import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
// import { GoogleTagManagerScript } from '@graphcommerce/googletagmanager'
import { CssAndFramerMotionProvider, GlobalHead, PageLoadIndicator } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { darkTheme } from '../components/Theme/ThemedProvider'

export default function ThemedApp(props: AppProps) {
  return (
    <CssAndFramerMotionProvider>
      <ThemeProvider theme={darkTheme}>
        {/* <GoogleAnalyticsScript /> */}
        {/* <GoogleRecaptchaV3Script /> */}
        {/* <GoogleTagManagerScript /> */}
        <GlobalHead name='GraphCommerce Docs' />
        <CssBaseline />
        <PageLoadIndicator />
        <FramerNextPages {...props} />
      </ThemeProvider>
    </CssAndFramerMotionProvider>
  )
}
