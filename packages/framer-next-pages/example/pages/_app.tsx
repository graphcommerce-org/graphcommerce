/// <reference types="@graphcommerce/next-ui/types" />

import '../demo.css'
import { PageComponent, FramerNextPages } from '@graphcommerce/framer-next-pages'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { responsiveVal } from '@graphcommerce/next-ui'
import { createTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import React from 'react'

const Fallback = dynamic(() => import('./[url]'), { ssr: false })

const theme = createTheme({
  spacings: {
    xxs: responsiveVal(10, 16),
    xs: responsiveVal(12, 20),
    sm: responsiveVal(14, 30),
    md: responsiveVal(16, 50),
    lg: responsiveVal(24, 80),
    xl: responsiveVal(80, 160),
    xxl: responsiveVal(100, 220),
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
    <LinguiProvider loader={async () => ({ messages: {} })}>
      <LazyMotion features={async () => (await import('../components/lazyMotion')).default}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FramerNextPages {...props} />
        </ThemeProvider>
      </LazyMotion>
    </LinguiProvider>
  )
}
