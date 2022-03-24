/// <reference types="@graphcommerce/next-ui/types" />

import { createTheme, CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material'
import { LazyMotion, domMax } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React from 'react'

const theme = createTheme({
  shape: {
    borderRadius: 4,
  },
})

export default function MyApp({ Component, pageProps }: AppPropsType<Router>) {
  return (
    <LazyMotion features={domMax} strict>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </LazyMotion>
  )
}
