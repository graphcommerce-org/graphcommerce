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
      main: '#FF4A55',
      contrastText: '#000',
      mutedText: `rgba(0,0,0,0.4)`,
      dark: '#f33642',
    },
    secondary: {
      main: '#006BFF',
      contrastText: '#000',
      mutedText: `rgba(0,0,0,0.4)`,
    },
    // tertiary: {
    //   main: '#2b153d',
    //   light: '#463058',
    //   '100': '#9f89b1',
    //   '500': '#2a183e',
    //   '600': '#2c153d',
    //   contrastText: '#fff',
    //   mutedText: `rgba(1,1,1,0.6)`,
    // },
    background: {
      default: '#fff',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    success: {
      main: '#01D26A',
      mutedText: '#b8b8b8',
    },
    text: {
      primary: '#000',
      secondary: '#000',
      disabled: 'rgba(0,0,0,0.4)',
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 960,
      lg: 1500,
      xl: 1920,
    },
  },
  shadows,
  typography: {
    fontFamily: ['Graphik', 'sans-serif'].join(', '),
    subtitle1: {},
    subtitle2: {},
    fontSize: 16,
    body1: {
      fontSize: responsiveVal(15, 18),
      lineHeight: 1.8,
    },
    caption: {
      color: 'rgba(0,0,0,0.4)',
      fontSize: responsiveVal(14, 18),
      fontWeight: 400,
      letterSpacing: '0.025em',
      lineHeight: 1.55,
    },
    h1: {
      fontSize: responsiveVal(36, 74),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      marginTop: '0.24em',
      marginBottom: '0.58em',
      lineHeight: 1.16,
    },
    h2: {
      fontSize: responsiveVal(12, 48),
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
      fontSize: responsiveVal(14, 22),
      fontWeight: 600,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h6: {
      fontSize: responsiveVal(13, 18),
      fontWeight: 500,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    fontWeightBold: 600,
  },
  spacings: {
    xxs: responsiveVal(8, 16),
    xs: responsiveVal(8, 20),
    sm: responsiveVal(10, 30),
    md: responsiveVal(16, 50),
    lg: responsiveVal(24, 80),
    xl: responsiveVal(80, 160),
    xxl: responsiveVal(100, 220),
  },
  page: {
    horizontal: responsiveVal(15, 30),
    vertical: responsiveVal(15, 30),
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
      backgroundColor: '#fff',
      boxShadow: defaultTheme.shadows[1],
      '&:hover': { boxShadow: defaultTheme.shadows[1] },
      '&:focus': { boxShadow: defaultTheme.shadows[1] },
    },
    containedPrimary: {
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
    containedSecondary: {
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
    containedSizeLarge: { padding: `15px ${responsiveVal(30, 60)}` },
    endIcon: { marginLeft: 20 },
    iconSizeLarge: {
      '& > *:first-child': { fontSize: 24 },
    },
    outlined: {
      // todo: Button isn't rounded on all places, but should be on homepage?
      borderRadius: 0,
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
  MuiChip: {
    outlined: {
      borderColor: defaultTheme.palette.divider,
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
