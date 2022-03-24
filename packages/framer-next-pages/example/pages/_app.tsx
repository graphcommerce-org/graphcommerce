/// <reference types="@graphcommerce/next-ui/types" />

import '../demo.css'
import { PageComponent, FramerNextPages } from '@graphcommerce/framer-next-pages'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { LazyMotion } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React from 'react'

const theme = createTheme({
  shape: {
    borderRadius: 4,
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
