/// <reference types="@reachdigital/next-ui/types" />

import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { responsiveVal } from '@reachdigital/next-ui'
import React from 'react'
import shadows from './shadows'

// Create a theme instance.
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FF4A55',
      contrastText: '#000',
      mutedText: `rgba(0,0,0,0.4)`,
      dark: '#f33642',
    },
    secondary: {
      main: '#006BFF',
      contrastText: '#FFF',
      mutedText: `rgba(0,0,0,0.4)`,
    },
    background: {
      default: '#fff',
      highlight: '#f8f8f8',
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
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    /**
     * `h1-h6` typography values refer to Headline type scale form the Material Design specifiction.
     * Although they are mapped by default to Heading elements they do not respresent them semantically
     *
     * - [1]: [Headline type scale](https://material.io/design/typography/the-type-system.html#type-scale)
     * - [2]: [Heading Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
     *
     * If we take a look at [Applying the type
     * scale](https://material.io/design/typography/the-type-system.html#applying-the-type-scale) we
     * see that the Headline 6 element is used in the `<h1/>` location.
     *
     * Since Material-UI doesn't allow for different Headline styles per used component, we map
     * these styles ourselves;
     *
     *     Variant    sm         md         lg         xl
     *     h1         headline4  headline3  headline2  headline1
     *     h2         headline5  headline5  headline4  headline3  headline2
     *     h3         headline6  headline6  headline5  headline4  headline3
     *     h4         ??         ??         headline6  headline5  headline4
     *     h5                                          headline6  headline5
     *     h6                                                     headline6
     *     subtitle1
     *     subtitle2
     *
     * This effectively means that we're only able to use h1 to h3, but that is fine, since we have
     * subtitle1 and subtitle2 as well.
     */
    h1: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(36, 74),
      fontWeight: 700,
      letterSpacing: '-0.0375em',
      marginTop: '0.24em',
      marginBottom: '0.58em',
      lineHeight: 1.16,
    },
    h2: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(28, 48),
      fontWeight: 700,
      letterSpacing: '-0.0375em',
      lineHeight: 1.42,
    },
    h3: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(18, 30),
      fontWeight: 700,
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h4: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontWeight: 500,
      fontSize: responsiveVal(18, 30),
      letterSpacing: '-0.0375em',
      lineHeight: 1.55,
      // letterSpacing: '-0.0375em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.0375em',
      fontSize: responsiveVal(17, 22),
      // letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h6: {
      fontSize: responsiveVal(17, 20),
      fontWeight: 500,
      // letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    subtitle1: {
      fontSize: responsiveVal(17, 20),
      fontWeight: 600,
      // letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    fontWeightBold: 700,
    body1: {
      // We're boosting the fontSize to be 17px at 1280
      fontSize: responsiveVal(15, 18, 1920),
      lineHeight: 1.8,
    },
    subtitle2: {
      fontSize: responsiveVal(14, 16),
      fontWeight: 600,
    },
    body2: {
      fontSize: responsiveVal(13, 15),
      lineHeight: 1.8,
    },
    caption: {
      // fontSize: 13,
    },
    button: {},
    overline: {
      fontSize: responsiveVal(12, 14),
      color: `rgba(0, 0, 0, 0.3)`,
      fontWeight: 500,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  },
  spacings: {
    xxs: responsiveVal(10, 16),
    xs: responsiveVal(12, 20),
    sm: responsiveVal(14, 30),
    md: responsiveVal(16, 50),
    lg: responsiveVal(24, 80),
    xl: responsiveVal(80, 160),
    xxl: responsiveVal(100, 220),
  },
  page: {
    horizontal: responsiveVal(10, 30),
    vertical: responsiveVal(10, 30),
    headerInnerHeight: {
      xs: responsiveVal(21, 33),
      sm: `56px`,
    },
  },
})

defaultTheme.overrides = {
  MuiCssBaseline: {
    '@global': {
      body: {
        overflowY: 'scroll',
      },
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
  MuiCheckbox: {
    colorPrimary: {
      color: '#EAEAEA',
      '&$checked': {
        color: defaultTheme.palette.primary.main,
      },
    },
  },
  MuiSwitch: {
    root: {
      padding: 7,
    },
    track: {
      '$colorPrimary + &': {
        backgroundColor: defaultTheme.palette.primary,
        borderRadius: 30,
      },
      '$checked$colorPrimary + &': {
        opacity: 1,
        backgroundColor: defaultTheme.palette.primary,
        borderRadius: 30,
      },
    },
    thumb: {
      backgroundColor: '#fff',
    },
  },
}

const ThemedProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)
export default ThemedProvider
