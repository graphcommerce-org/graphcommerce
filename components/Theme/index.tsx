import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'

export type UseStyles<T extends (...args: unknown[]) => unknown> = {
  classes?: Partial<ReturnType<T>>
}

export const vpCalc = (min: number, max: number, axis: 'vw' | 'vh' = 'vw'): string => {
  const round = (x: number, n: number): number => Math.round(x * 10 ** n) / 10 ** n

  const minBreakpoint = axis === 'vw' ? 320 : 560
  const maxBreakpoint = axis === 'vw' ? 1280 : 720
  const growth = (max - min) / (maxBreakpoint - minBreakpoint)
  const base = round(min - growth * minBreakpoint, 2)
  const vsize = round(growth * 100, 2)

  const calc = `calc(${base}px + ${vsize}${axis})`
  return `max(${min}px, min(${calc}, ${max}px))`
}

const fonts: Array<{
  font: string
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontStyle: 'normal' | 'italic'
  preload?: true
}> = [
  { font: 'Graphik-Thin', fontWeight: 100, fontStyle: 'normal' },
  { font: 'Graphik-ThinItalic', fontWeight: 100, fontStyle: 'italic' },
  { font: 'Graphik-Extralight', fontWeight: 200, fontStyle: 'normal' },
  { font: 'Graphik-ExtralightItalic', fontWeight: 200, fontStyle: 'italic' },
  { font: 'Graphik-Light', fontWeight: 300, fontStyle: 'normal' },
  { font: 'Graphik-LightItalic', fontWeight: 300, fontStyle: 'italic' },
  { font: 'Graphik-Regular', fontWeight: 400, fontStyle: 'normal', preload: true },
  { font: 'Graphik-RegularItalic', fontWeight: 400, fontStyle: 'italic', preload: true },
  { font: 'Graphik-Medium', fontWeight: 500, fontStyle: 'normal', preload: true },
  { font: 'Graphik-MediumItalic', fontWeight: 500, fontStyle: 'italic' },
  { font: 'Graphik-Semibold', fontWeight: 600, fontStyle: 'normal', preload: true },
  { font: 'Graphik-SemiboldItalic', fontWeight: 600, fontStyle: 'italic', preload: true },
  { font: 'Graphik-Bold', fontWeight: 700, fontStyle: 'normal' },
  { font: 'Graphik-BoldItalic', fontWeight: 700, fontStyle: 'italic' },
  { font: 'Graphik-Black', fontWeight: 800, fontStyle: 'normal' },
  { font: 'Graphik-BlackItalic', fontWeight: 800, fontStyle: 'italic' },
  { font: 'Graphik-Super', fontWeight: 900, fontStyle: 'normal' },
  { font: 'Graphik-SuperItalic', fontWeight: 900, fontStyle: 'italic' },
]

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    tertiary: PaletteColorOptions
  }
  interface Palette {
    tertiary: PaletteColor & ColorPartial
  }
}
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    gridSpacing: {
      row: string
      column: string
      gutter: string
    }
    spacings: {
      xl: string
    }
  }
  interface ThemeOptions {
    gridSpacing: {
      row: string
      column: string
      gutter: string
    }
    spacings: {
      xl: string
    }
  }
}

// Create a theme instance.
export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#13e4ad',
      contrastText: '#000',
    },
    secondary: {
      main: '#fffe00',
      contrastText: '#000',
      light: '#b8b8b8',
    },
    tertiary: {
      main: '#2b153d',
      light: '#463058',
      '100': '#9f89b1',
      '500': '#2a183e',
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
    body1: { fontSize: vpCalc(15, 20) },
    body2: { fontSize: vpCalc(13, 15) },
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
      fontWeight: 400,
      letterSpacing: '-0.0375em',
    },
    h5: {},
    h6: {},
    fontWeightBold: 600,
  },
  gridSpacing: {
    column: vpCalc(18, 60),
    row: vpCalc(12, 40),
    gutter: vpCalc(27, 90),
  },
  spacings: {
    xl: vpCalc(48, 160),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': fonts.map(({ font, fontWeight, fontStyle }) => ({
          fontFamily: 'Graphic',
          fontWeight,
          fontStyle,
          fontDisplay: 'swap',
          src: `url('/fonts/${font}.woff2') format('woff2')`,
        })),
      },
    },
    MuiButton: {
      root: {
        fontWeight: 400,
        textTransform: 'none',
      },
      contained: {
        backgroundColor: '#fff',
        '& .MuiSvgIcon-root': {
          color: '#13e4ad',
        },
      },
      containedPrimary: {
        color: '#fff',
        '& .MuiSvgIcon-root': {
          color: '#fff',
        },
      },
      containedSizeLarge: {
        padding: '15px 30px',
      },
      endIcon: {
        marginLeft: 20,
      },
      iconSizeLarge: {
        '& > *:first-child': {
          fontSize: 24,
        },
      },
    },
  },
})

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
