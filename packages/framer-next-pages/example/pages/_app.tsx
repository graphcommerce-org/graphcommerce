/// <reference types="@graphcommerce/next-ui/types" />

import '../demo.css'
import { PageComponent, FramerNextPages } from '@graphcommerce/framer-next-pages'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { createTheme, createResponsiveTemplate, themeBaseDefaults } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LazyMotion } from 'framer-motion'
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
