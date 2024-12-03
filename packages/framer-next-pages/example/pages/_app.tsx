/// <reference types="@graphcommerce/next-ui/types" />
import type { PageComponent } from '@graphcommerce/framer-next-pages'
import { FramerNextPages } from '@graphcommerce/framer-next-pages'
// eslint-disable-next-line import/no-extraneous-dependencies
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { responsiveVal } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { LazyMotion } from 'framer-motion'
import type { AppPropsType } from 'next/dist/shared/lib/utils'
import type { Router } from 'next/router'
import React from 'react'
import '../demo.css'

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
