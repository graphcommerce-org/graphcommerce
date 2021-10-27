/// <reference types="@graphcommerce/next-ui/types" />

import { responsiveVal } from '@graphcommerce/next-ui'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import shadows from './shadows'

// Create a theme instance.
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#001727',
      contrastText: '#FF0000',
      mutedText: `rgba(0,0,0,0.4)`,
      dark: '#FF0000',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#001727',
      mutedText: `rgba(0,0,0,0.4)`,
    },
    background: {
      default: '#FFF',
      highlight: '#F8F8F8',
    },
    divider: '#EBEBEB',
    success: {
      main: '#01D26A',
      mutedText: '#B8B8B8',
    },
    text: {
      primary: '#001727',
      secondary: '#999EB5',
      disabled: 'rgba(0,0,0,0.4)',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1400,
      xl: 1920,
    },
  },
  shadows,

  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    /**
     * [The Material UI `h1`-`h6` typography
     * values](https://material-ui.com/components/typography/#component) are an implementation of
     * the [Material Design Headline type
     * scale](https://material.io/design/typography/the-type-system.html#type-scale).
     *
     * Note: The typography values are referencing styles and have nothing to do with actual
     * `<h1/>`-`</h6/>` HTML elements (even though they are mapped 1:1 by default). One is
     * completelt free to use different styles based on their requirements.
     *
     * There however are some problems with the way Material UI implementation: Material Design uses
     * different typography headers for different breakpoints. For example, if we take a look at
     * [Applying the type
     * scale](https://material.io/design/typography/the-type-system.html#applying-the-type-scale) we
     * see that the Headline 6 element is used in the `<h1/>` location. This would need to be
     * rendered as a h1 (or h2) style on a desktop.
     *
     * This results in the following variant to headline mapping for each breakpoint
     *
     *     Variant/Breakpoint  xs         sm         md         lg         xl
     *     h1                  headline4  headline3  headline2  headline1
     *     h2                  headline5  headline4  headline3  headline2  headline1
     *     h3                  headline6  headline6  headline5  headline4  headline3
     *     h4                  X          X          headline6  headline5  headline4
     *     h5                  X          X          X          headline6  headline5
     *     h6                  X          X          X          X          headline6
     *
     * This effectively means that it's only safe to use h1 to h3 from this perspective.
     *
     * However, Material Design's type system offers `subtitle1` and `subtitle2` that can be used
     * that should be used on combination with `body1` and `body2`.
     *
     * Since we aren't using the h4-h6 variants they can be repurposed for different usecases:
     */
    h1: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(36, 74),
      fontWeight: 700,
      // letterSpacing: '-0.0375em',
      marginTop: '0.24em',
      marginBottom: '0.58em',
      lineHeight: 1.16,
    },
    h2: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(36, 58),
      fontWeight: 700,
      marginTop: '0.24em',
      marginBottom: '0.58em',
      // letterSpacing: '-0.0375em',
      lineHeight: 1.22,
    },
    h3: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(16, 24),
      fontWeight: 600,
      marginTop: '0.24em',
      marginBottom: '0.58em',
      // letterSpacing: '-0.0375em',
      lineHeight: 1.6,
    },
    h4: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(16, 22),
      fontWeight: 650,
      marginTop: '0.24em',
      marginBottom: '0.58em',
      // letterSpacing: '-0.0375em',
      lineHeight: 1.55,
    },
    h5: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontWeight: 700,
      // letterSpacing: '-0.0375em',
      fontSize: responsiveVal(17, 20),
      lineHeight: 1.55,
    },
    h6: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(14, 18),
      fontWeight: 600,
      // letterSpacing: '-0.0375em',
      lineHeight: 1.8,
    },
    subtitle1: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(16, 24, 1920),
      // letterSpacing: '-0.0375em',
      lineHeight: 1.5,
    },
    fontWeightBold: 600,
    body1: {
      // We're boosting the fontSize to be 17px at 1280
      fontSize: responsiveVal(15, 20, 1920),
      lineHeight: 1.6,
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: ['Public Sans', 'sans-serif'].join(', '),
      fontSize: responsiveVal(14, 16),
      fontWeight: 600,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: responsiveVal(13, 15),
      lineHeight: 1.7,
    },
    caption: {
      fontSize: responsiveVal(11, 13),
    },
    button: {},
    overline: {
      display: 'inline-block',
      fontSize: responsiveVal(12, 18),
      color: '#62C7B0',
      marginTop: '0.24em',
      marginBottom: '0.8em',
      fontWeight: 600,
      letterSpacing: 1,
      lineHeight: 1.2,
      textTransform: 'uppercase',
      backgroundImage: 'linear-gradient(45deg, #CEFF99, #85FFFD)',
      backgroundSize: '100%',
      '-webkit-background-clip': 'text',
      '-moz-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      '-moz-text-fill-color': 'transparent',
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
      // 32px = height of logo
      // + 2 x theme.spacings.xxs (top+bottom padding)
      md: `calc(40px + (${responsiveVal(10, 16)} * 2))`,
    },
  },
})

defaultTheme.overrides = {
  MuiCssBaseline: {
    '@global': {
      body: {
        overflowY: 'scroll',
      },
      '::selection': { background: '#62C7B0' },
      '::-moz-selection': { background: '#62C7B0' },
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
    endIcon: {
      marginLeft: 0,
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
    root: {
      boxShadow: defaultTheme.shadows[5],
      backgroundColor: defaultTheme.palette.background.paper,
      height: responsiveVal(28, 32),
      borderRadius: responsiveVal(28 / 2, 32 / 2),
    },
    outlined: {
      borderColor: defaultTheme.palette.divider,
      boxShadow: 'unset',
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
