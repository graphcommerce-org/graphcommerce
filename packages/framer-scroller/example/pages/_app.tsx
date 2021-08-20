import { createTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { LazyMotion, domMax } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React, { useEffect } from 'react'

const theme = createTheme({})

export default function MyApp({ Component, pageProps }: AppPropsType<Router>) {
  useEffect(() => document.getElementById('jss-server-side')?.remove())
  return (
    <LazyMotion features={domMax} strict>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </LazyMotion>
  )
}
