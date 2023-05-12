/// <reference types="@graphcommerce/next-ui/types" />

import '../demo.css'
import { PageComponent, FramerNextPages } from '@graphcommerce/framer-next-pages'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { responsiveVal } from '@graphcommerce/next-ui'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/compat/router'
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

export default function MyApp(props: AppPropsType<Router> & { Component: PageComponent }) {
  return (
    <LinguiProvider
      locale='en'
      loader={async () => Promise.resolve({ messages: {} })}
      ssrLoader={() => ({ messages: {} })}
    >
      <LazyMotion features={async () => (await import('../components/lazyMotion')).default}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FramerNextPages {...props} />
        </ThemeProvider>
      </LazyMotion>
    </LinguiProvider>
  )
}
