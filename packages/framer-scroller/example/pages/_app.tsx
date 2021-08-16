import { createTheme, CssBaseline, MuiThemeProvider, ThemeProvider } from '@material-ui/core'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React from 'react'

const theme = createTheme({})

export default function MyApp({ Component, pageProps }: AppPropsType<Router>) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MuiThemeProvider>
  )
}
