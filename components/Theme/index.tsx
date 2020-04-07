import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

export const vpCalc = (min: number, max: number, axis: 'vw' | 'vh' = 'vw'): string => {
  const round = (x: number, n: number) => Math.round(x * 10 ** n) / 10 ** n

  const minBreakpoint = axis === 'vw' ? 320 : 560
  const maxBreakpoint = axis === 'vw' ? 1280 : 720
  const growth = (max - min) / (maxBreakpoint - minBreakpoint)
  const base = round(min - growth * minBreakpoint, 2)
  const vsize = round(growth * 100, 2)

  const calc = `calc(${base}px + ${vsize}${axis})`
  return `max(${min}px, min(${calc}, ${max}px))`
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

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    tertiary: PaletteColorOptions
  }
  interface Palette {
    tertiary: PaletteColor
  }
}

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#13e4ad',
      contrastText: '#000',
    },
    secondary: {
      main: '#fffe00',
      contrastText: '#000',
    },
    tertiary: {
      main: '#2b153d',
      light: '#463058',
      '100': '#9f89b1',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
    },
    divider: '#fff',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1500,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ['Graphic', 'sans-serif'].join(', '),
    fontSize: 18,
    body1: { fontSize: vpCalc(18, 20) },
    body2: { fontSize: vpCalc(13, 15) },
    subtitle1: {},
    subtitle2: {},
    h1: {
      fontSize: vpCalc(36, 74),
      fontWeight: 400,
      letterSpacing: '-0.0375em',
    },
    h2: {
      fontSize: vpCalc(24, 48),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
    },
    h3: {
      fontSize: vpCalc(22, 30),
      fontWeight: 400,
      letterSpacing: '-0.0375em',
    },
    h4: {
      fontSize: vpCalc(18, 25),
      fontWeight: 400,
      letterSpacing: '-0.0375em',
    },
    h5: {},
    h6: {},
    fontWeightBold: 600,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': fonts.map(([font, fontWeight, fontStyle]) => ({
          fontFamily: 'Graphic',
          fontWeight,
          fontStyle,
          fontDisplay: 'swap',
          src: `url('/fonts/${font}.woff2') format('woff2'), url('/fonts/${font}.woff') format('woff')`,
        })),
      },
    },
  },
})

const ThemedProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
export default ThemedProvider
