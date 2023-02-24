/// <reference types="@graphcommerce/next-ui/types" />

import { createResponsiveTemplate, createTheme, themeBaseDefaults } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material'
import { LazyMotion, domMax } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React from 'react'

const responsiveTemplate = createResponsiveTemplate(themeBaseDefaults.breakpoints.values)

const theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  spacings: {
    xxs: responsiveTemplate`${[10, 16]}px`,
    xs: responsiveTemplate`${[12, 20]}px`,
    sm: responsiveTemplate`${[12, 20]}px`,
    md: responsiveTemplate`${[16, 50]}px`,
    lg: responsiveTemplate`${[24, 80]}px`,
    xl: responsiveTemplate`${[40, 100]}px`,
    xxl: responsiveTemplate`${[80, 160]}px`,
  },
  page: {
    horizontal: responsiveTemplate`${[10, 30]}px`,
    vertical: responsiveTemplate`${[10, 30]}px`,
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
