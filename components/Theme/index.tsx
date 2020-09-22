import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import fonts from './fonts'
import shadows from './shadows'

export type UseStyles<T extends (...args: never[]) => unknown> = {
  classes?: Partial<ReturnType<T>>
}

export const vpCalc = (min: number, max: number, axis: 'vw' | 'vh' = 'vw'): string => {
  const round = (x: number, n: number): number => Math.round(x * 10 ** n) / 10 ** n

  const minBreakpoint = axis === 'vw' ? 320 : 560
  const maxBreakpoint = axis === 'vw' ? 1280 : 720
  const growth = (max - min) / (maxBreakpoint - minBreakpoint)
  const base = round(min - growth * minBreakpoint, 2)
  const vsize = round(growth * 100, 2)

  const calc = `(${base}px + ${vsize}${axis})`
  return `max(${min}px, min(${calc}, ${max}px))`
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    tertiary: PaletteColorOptions
  }
  interface Palette {
    tertiary: PaletteColor & ColorPartial
  }

  interface SimplePaletteColorOptions {
    mutedText: string
  }
  interface PaletteColor {
    mutedText: string
  }
}
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    spacings: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
  }
  interface ThemeOptions {
    spacings: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
  }
}

// Create a theme instance.
export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F65C5E',
      contrastText: '#000',
      mutedText: '#b8b8b8',
      dark: '#DC0000',
    },
    secondary: {
      main: '#0049FF',
      contrastText: '#000',
      mutedText: '#b8b8b8',
    },
    tertiary: {
      main: '#2b153d',
      light: '#463058',
      '100': '#9f89b1',
      '500': '#2a183e',
      '600': '#2c153d',
      contrastText: '#fff',
      mutedText: '#b8b8b8',
    },
    background: {
      default: '#fff',
      paper: '#f8f8f8',
    },
    divider: '#f2f2f2',
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
  shadows,
  typography: {
    fontFamily: ['Graphic', 'sans-serif'].join(', '),
    subtitle1: {},
    subtitle2: {},
    h1: {
      fontSize: vpCalc(36, 74),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      marginTop: '0.24em',
      marginBottom: '0.58em',
      lineHeight: 1.16,
    },
    h2: {
      fontSize: vpCalc(24, 48),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.42,
    },
    h3: {
      fontSize: vpCalc(22, 30),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h4: {
      fontSize: vpCalc(18, 25),
      fontWeight: 500,
      letterSpacing: '-0.0375em',
    },
    h5: {
      fontSize: vpCalc(15, 22),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h6: {},
    fontWeightBold: 600,
  },
  spacings: {
    xs: vpCalc(6, 20),
    sm: vpCalc(10, 30),
    md: vpCalc(16, 50),
    lg: vpCalc(24, 80),
    xl: vpCalc(48, 160),
    xxl: vpCalc(104, 250),
  },
})

defaultTheme.overrides = {
  MuiCssBaseline: {
    '@global': {
      '@font-face': fonts.map(({ font, fontWeight, fontStyle }) => ({
        fontFamily: 'Graphic',
        fontWeight,
        fontStyle,
        fontDisplay: 'swap',
        src: `url('/fonts/${font}.woff2') format('woff2')`,
      })),
      '::selection': { background: `rgba(20, 227, 173, 0.5)` },
      '::-moz-selection': { background: `rgba(20, 227, 173, 0.5)` },
    },
  },
  MuiButton: {
    root: {
      fontWeight: 400,
      textTransform: 'none',
    },
    contained: {
      borderRadius: 0,
      backgroundColor: '#fff',
      boxShadow: defaultTheme.shadows[8],
      '&:hover': { boxShadow: defaultTheme.shadows[10] },
      '&:focus': { boxShadow: defaultTheme.shadows[12] },
      '& .MuiSvgIcon-root': { color: defaultTheme.palette.primary.main },
    },
    containedPrimary: {
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
    containedSizeLarge: { padding: '15px 30px' },
    endIcon: { marginLeft: 20 },
    iconSizeLarge: {
      '& > *:first-child': { fontSize: 24 },
    },
  },
  MuiFab: {
    root: {
      backgroundColor: '#fff',
      '&:hover': { backgroundColor: '#efefef' },
    },
  },
  MuiBadge: {
    badge: {
      height: 21,
    },
  },
}

const ThemedProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <Head>
      {fonts
        .filter(({ preload }) => preload)
        .map(({ font }) => (
          <link key={font} rel='preload' href={`/fonts/${font}.woff2`} as='font' crossOrigin='' />
        ))}
    </Head>
    {children}
  </ThemeProvider>
)
export default ThemedProvider
