import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import { createMuiTheme } from '@material-ui/core/styles'
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

const fonts: Array<[
  string,
  100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  'normal' | 'italic',
]> = [
  ['Graphik-Thin', 100, 'normal'],
  ['Graphik-ThinItalic', 100, 'italic'],
  ['Graphik-Extralight', 200, 'normal'],
  ['Graphik-ExtralightItalic', 200, 'italic'],
  ['Graphik-Light', 300, 'normal'],
  ['Graphik-LightItalic', 300, 'italic'],
  ['Graphik-Regular', 400, 'normal'],
  ['Graphik-RegularItalic', 400, 'italic'],
  ['Graphik-Mediumlight', 500, 'normal'],
  ['Graphik-MediumItalic', 500, 'italic'],
  ['Graphik-Semibold', 600, 'normal'],
  ['Graphik-SemiboldItalic', 600, 'italic'],
  ['Graphik-Bold', 700, 'normal'],
  ['Graphik-BoldItalic', 700, 'italic'],
  ['Graphik-Black', 800, 'normal'],
  ['Graphik-BlackItalic', 800, 'italic'],
  ['Graphik-Super', 900, 'normal'],
  ['Graphik-SuperItalic', 900, 'italic'],
]

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
  typography: {
    fontFamily: ['Graphic', 'sans-serif'].join(', '),
    fontSize: 18,
    body1: { fontSize: vpCalc(18, 20) },
    body2: { fontSize: vpCalc(15, 20) },
    subtitle1: {},
    subtitle2: {},
    h1: { fontSize: vpCalc(36, 74) },
    h2: { fontSize: vpCalc(24, 48) },
    h3: { fontSize: vpCalc(22, 30) },
    h4: { fontSize: vpCalc(18, 25) },
    h5: {},
    h6: {},
  },
  spacing: (factor): string => vpCalc(factor * 4, factor * 8),
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': fonts.map(([font, fontWeight, fontStyle]) => ({
          fontFamily: 'Graphic',
          fontWeight,
          fontStyle,
          fontDisplay: 'swap',
          src: `url('/fonts/${font}.woff2') format('woff2'),
                url('/fonts/${font}.woff') format('woff')`,
        })),
      },
    },
  },
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
