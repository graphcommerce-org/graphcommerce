/// <reference types="@graphcommerce/next-ui/types" />

import { responsiveVal } from '@graphcommerce/next-ui'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { LazyMotion, domMax } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React from 'react'

const theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  spacings: {
    xxs: responsiveVal(10, 16),
    xs: responsiveVal(12, 20),
    sm: responsiveVal(14, 30),
    md: responsiveVal(16, 50),
    lg: responsiveVal(24, 80),
    xl: responsiveVal(40, 100),
    xxl: responsiveVal(80, 160),
  },
  page: {
    horizontal: responsiveVal(10, 30),
    vertical: responsiveVal(10, 30),
  },
  appShell: {
    headerHeightSm: '46px',
    headerHeightMd: '110px',
    appBarHeightMd: '80px',
    appBarInnerHeightMd: '46px',
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
