'use client'

import { useMeasureDynamicViewportSize } from '@graphcommerce/framer-utils'
import {
  DarkLightModeThemeProvider,
  PageLoadIndicator,
  PageLoadIndicator2,
} from '@graphcommerce/next-ui'
import { i18n, Messages } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { CssBaseline, styled } from '@mui/material'
import { LazyMotion } from 'framer-motion'
import { ReactNode, useMemo } from 'react'
import { darkTheme, lightTheme } from '../../components/theme'
import { StylesCacheProvider } from './StyleCacheProvider'
import { GlobalHead } from '@graphcommerce/magento-store'

const Body = styled('body')({
  '--client-size-y': '100vh',
  '--client-size-x': '100vw',
  '@supports(height: 100dvh)': {
    '--client-size-y': '100dvh',
    '--client-size-x': '100dvw',
  },
})

type RootLayoutClientProps = {
  children: ReactNode
  messages: Messages
  linguiLocale: string
}

export function RootLayoutClient(props: RootLayoutClientProps) {
  const { children, messages, linguiLocale } = props

  const i = useMemo(() => {
    i18n.load(linguiLocale, messages)
    i18n.activate(linguiLocale)
    return i18n
  }, [linguiLocale, messages])

  useMeasureDynamicViewportSize()

  return (
    <Body>
      <StylesCacheProvider options={{ key: 'css' }}>
        <LazyMotion
          features={() =>
            import('@graphcommerce/next-ui/Page/framerFeatures').then((m) => m.default)
          }
          strict
        >
          <I18nProvider i18n={i}>
            <DarkLightModeThemeProvider light={lightTheme} dark={darkTheme}>
              <GlobalHead />
              <CssBaseline enableColorScheme />
              <PageLoadIndicator2 />
              {children}
            </DarkLightModeThemeProvider>
          </I18nProvider>
        </LazyMotion>
      </StylesCacheProvider>
    </Body>
  )
}
