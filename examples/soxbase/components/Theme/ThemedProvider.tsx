import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import Head from 'next/head'
import React from 'react'
import fonts from './fonts'
import shadows from './shadows'

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
      main: '#001fff',
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
    },
    divider: '#f2f2f2',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1800,
      xl: 1920,
    },
  },
  shadows,
  typography: {
    fontFamily: ['Graphic', 'sans-serif'].join(', '),
    subtitle1: {},
    subtitle2: {},
    fontSize: 16,
    body1: { fontSize: responsiveVal(15, 18) },
    h1: {
      fontSize: responsiveVal(36, 74),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      marginTop: '0.24em',
      marginBottom: '0.58em',
      lineHeight: 1.16,
    },
    h2: {
      fontSize: responsiveVal(24, 48),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.42,
    },
    h3: {
      fontSize: responsiveVal(22, 30),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h4: {
      fontSize: responsiveVal(18, 25),
      fontWeight: 500,
      letterSpacing: '-0.0375em',
    },
    h5: {
      fontSize: responsiveVal(15, 22),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h6: {
      fontSize: responsiveVal(14, 18),
      fontWeight: 500,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    fontWeightBold: 600,
  },
  spacings: {
    xxs: responsiveVal(5, 16),
    xs: responsiveVal(6, 20),
    sm: responsiveVal(10, 30),
    md: responsiveVal(16, 50),
    lg: responsiveVal(24, 80),
    xl: responsiveVal(48, 160),
    xxl: responsiveVal(104, 250),
  },
  page: {
    horizontal: responsiveVal(15, 40),
    vertical: responsiveVal(15, 40),
    headerInnerHeight: {
      xs: responsiveVal(21, 33),
      sm: `48px`,
    },
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
  MuiContainer: {
    root: {
      paddingLeft: defaultTheme.page.horizontal,
      paddingRight: defaultTheme.page.horizontal,
      [defaultTheme.breakpoints.up('sm')]: {
        paddingLeft: undefined,
        paddingRight: undefined,
      },
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
    },
    containedPrimary: {
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
    containedSecondary: {
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
    primary: {
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
    secondary: {
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
    extended: {
      fontWeight: 400,
      textTransform: 'none',
    },
  },
  MuiInputLabel: {
    root: {
      '&$focused:not($error)': {
        color: defaultTheme.palette.secondary.main,
      },
    },
  },
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: defaultTheme.palette.secondary.main,
      },
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
    <CssBaseline />
    {children}
  </ThemeProvider>
)
export default ThemedProvider
