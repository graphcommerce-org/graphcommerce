import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { GraphCmsPage, PageMeta, Breadcrumbs, Language } from '../graphcms'

export const vpCalc = (
  min: number,
  max: number,
  fallback: boolean = false,
  maxBreakpoint: number = 1280,
): string => {
  const round = (x: number, n: number) => Math.round(x * 10 ** n) / 10 ** n

  const minBreakpoint = 320
  const growth = (max - min) / (maxBreakpoint - minBreakpoint)
  const base = round(min - growth * minBreakpoint, 2)
  const vsize = round(growth * 100, 2)

  const calc = `calc(${base}px + ${vsize}vw)`
  return fallback ? calc : `max(${min}px, min(${calc}, ${max}px))`
}

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#13e4ad',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  spacing: (factor): string => vpCalc(factor * 4, factor * 8),
})

const FullLayout: GraphCmsPage['layout'] = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name='theme-color' content={theme.palette.primary.main} />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <CssBaseline />
      <PageMeta {...props} />
      <Breadcrumbs {...props} />
      <Language {...props} />
      {children}
    </ThemeProvider>
  )
}

export { FullLayout }
