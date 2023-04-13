'use client'

import { useMeasureDynamicViewportSize } from '@graphcommerce/framer-utils'
import { GraphQLProvider, GraphQLProviderProps } from '@graphcommerce/graphql'
import { DarkLightModeThemeProvider } from '@graphcommerce/next-ui'
import { i18n, Messages } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { CssBaseline, styled } from '@mui/material'
import { LazyMotion } from 'framer-motion'
import { nl } from 'make-plural/plurals'
import { ReactNode, useMemo } from 'react'
import { darkTheme, lightTheme } from '../../components/theme'
import { useLocale } from '../locale'
import { StylesCacheProvider } from './StyleCacheProvider'

const Body = styled('body')({
  '--client-size-y': '100vh',
  '--client-size-x': '100vw',
  '@supports(height: 100dvh)': {
    '--client-size-y': '100dvh',
    '--client-size-x': '100dvw',
  },
})

type RootLayoutClientProps = { children: ReactNode; messages: Messages } & GraphQLProviderProps

export function RootLayoutClient(props: RootLayoutClientProps) {
  const { children, messages, locale } = props

  const i = useMemo(() => {
    i18n.loadLocaleData({ nl: { plurals: nl } })
    i18n.load(locale, messages)
    i18n.activate(locale)
    return i18n
  }, [locale, messages])

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
              <CssBaseline enableColorScheme />
              <GraphQLProvider {...props}>{children}</GraphQLProvider>
            </DarkLightModeThemeProvider>
          </I18nProvider>
        </LazyMotion>
      </StylesCacheProvider>
    </Body>
  )
}
