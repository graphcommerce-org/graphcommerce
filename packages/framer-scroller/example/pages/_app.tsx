/// <reference types="@graphcommerce/next-ui/types" />

import { createResponsiveTemplate, createTheme, themeBaseDefaults } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material'
import { LazyMotion, domMax } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React from 'react'

const rv = createResponsiveTemplate(themeBaseDefaults.breakpoints.values)

const theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  spacings: {
    xxs: rv`${[10, 16]}px`,
    xs: rv`${[12, 20]}px`,
    sm: rv`${[12, 20]}px`,
    md: rv`${[16, 50]}px`,
    lg: rv`${[24, 80]}px`,
    xl: rv`${[40, 100]}px`,
    xxl: rv`${[80, 160]}px`,
  },
  page: {
    horizontal: rv`${[10, 30]}px`,
    vertical: rv`${[10, 30]}px`,
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
