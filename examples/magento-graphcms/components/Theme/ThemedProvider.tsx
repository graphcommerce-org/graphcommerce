/// <reference types="@graphcommerce/next-ui/types" />

import { responsiveVal } from '@graphcommerce/next-ui'
import { createTheme, CssBaseline, Theme, ThemeProvider, lighten, alpha } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { Overrides } from '@material-ui/core/styles/overrides'
import React from 'react'
import shadows from './shadows'

const useTheme: 'light' | 'dark' = 'light'

const lightPalette: PaletteOptions = {
  type: 'light',
  primary: {
    main: '#FF4A55',
    contrastText: '#FFFFFF',
    dark: '#F33642',
  },
  secondary: {
    main: '#006BFF',
    light: '#D1E4FF',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    image: '#F8F8F8',
  },
  divider: '#00000015',
  success: {
    main: '#01D26A',
  },
  action: {
    hoverOpacity: 0.16,
  },
  text: {
    primary: '#000000',
    secondary: '#00000050',
    disabled: '#00000030',
  },
}

const darkPalette: PaletteOptions = {
  type: 'dark',
  primary: {
    main: '#62C7B0',
    contrastText: '#ffffff',
    dark: '#62C7B0',
  },
  secondary: {
    main: '#006BFF',
    light: '#142b38',
    contrastText: '#ffffff',
  },
  background: {
    default: '#001727',
    paper: lighten('#001727', 0.08),
    image: '#F8F8F8',
  },
  divider: '#ffffff30',
  success: {
    main: '#01D26A',
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffffff80',
    disabled: '#ffffff30',
  },
}

// Create a theme instance.
const createThemeWithPallete = (palette: PaletteOptions) =>
  createTheme({
    palette,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1536,
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
       * There however are some problems with the way Material UI implementation: Material Design
       * uses different typography headers for different breakpoints. For example, if we take a look
       * at [Applying the type
       * scale](https://material.io/design/typography/the-type-system.html#applying-the-type-scale)
       * we see that the Headline 6 element is used in the `<h1/>` location. This would need to be
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
        // fontFamily: ['Public Sans', 'sans-serif'].join(', '),
        fontSize: responsiveVal(28, 64),
        fontWeight: 700,
        // letterSpacing: '-0.0375em',
        lineHeight: 1.22,
      },
      h2: {
        // fontFamily: ['Public Sans', 'sans-serif'].join(', '),
        fontSize: responsiveVal(25, 40),
        fontWeight: 700,
        // letterSpacing: '-0.0375em',
        lineHeight: 1.35,
      },
      h3: {
        // fontFamily: ['Public Sans', 'sans-serif'].join(', '),
        fontSize: responsiveVal(22, 30),
        fontWeight: 700,
        // letterSpacing: '-0.0375em',
        lineHeight: 1.55,
      },
      h4: {
        // fontFamily: ['Public Sans', 'sans-serif'].join(', '),
        fontWeight: 500,
        fontSize: responsiveVal(18, 26),
        // letterSpacing: '-0.0375em',
        lineHeight: 1.55,
      },
      h5: {
        // fontFamily: ['Public Sans', 'sans-serif'].join(', '),

        fontWeight: 700,
        // letterSpacing: '-0.0375em',
        fontSize: responsiveVal(17, 20),
        lineHeight: 1.55,
      },
      h6: {
        // fontFamily: ['Public Sans', 'sans-serif'].join(', '),

        fontSize: responsiveVal(17, 20),
        fontWeight: 550,
        // letterSpacing: '-0.0375em',
        lineHeight: 1.8,
      },
      subtitle1: {
        fontSize: responsiveVal(16, 19, 1920),
        fontWeight: 400,
        // letterSpacing: '-0.0375em',
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        // We're boosting the fontSize to be 17px at 1280
        fontSize: responsiveVal(16, 18, 1920),
        lineHeight: 1.7,
      },
      subtitle2: {
        fontSize: responsiveVal(14, 16),
        fontWeight: 600,
        lineHeight: 1.7,
      },
      body2: {
        fontSize: responsiveVal(13, 15),
        lineHeight: 1.7,
      },
      // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
      caption: {
        fontSize: responsiveVal(12, 13),
      },
      button: {},
      overline: {
        fontSize: responsiveVal(12, 14),
        fontWeight: 500,
        letterSpacing: 1,
        lineHeight: 1.2,
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
        // 32px = height of logo
        // + 2 x theme.spacings.xxs (top+bottom padding)
        md: '72px', // `calc(40px + (${responsiveVal(10, 16)} * 2))`,
      },
    },
  })

const createOverrides = (theme: Theme): Overrides => {
  return {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowY: 'scroll',
          '& [class*="Sheet-content"]': {
            background: theme.palette.background.default,
          },
          stroke: theme.palette.text.primary,
        },
        '::selection': { background: alpha(theme.palette.primary.main, 0.6) },
        '::-moz-selection': { background: alpha(theme.palette.primary.main, 0.6) },
        '#__next': {
          position: 'relative',
        },
      },
    },
    MuiContainer: {
      root: {
        paddingLeft: theme.page.horizontal,
        paddingRight: theme.page.horizontal,
        [theme.breakpoints.up('sm')]: {
          paddingLeft: undefined,
          paddingRight: undefined,
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        ...theme.typography.body2,
        fontWeight: 400,
        padding: `${responsiveVal(8, 10)} ${responsiveVal(12, 22)}`,
      },
      sizeLarge: {
        padding: `${responsiveVal(10, 15)} ${responsiveVal(30, 60)}`,
        ...theme.typography.body1,
        fontWeight: 500,
      },
      iconSizeLarge: {
        '& > *:first-child': { fontSize: 24 },
      },
      endIcon: {
        marginLeft: 0,
      },
      contained: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        '&:hover': {
          boxShadow: theme.shadows[1],
          backgroundColor: lighten(
            theme.palette.background.default,
            theme.palette.action.hoverOpacity,
          ),
        },
        '&:focus': {
          boxShadow: theme.shadows[1],
          backgroundColor: lighten(
            theme.palette.background.default,
            theme.palette.action.hoverOpacity,
          ),
        },
      },
      containedPrimary: {
        fontWeight: 500,
        color: theme.palette.primary.contrastText,
        '& svg': { stroke: theme.palette.primary.contrastText },
      },
      containedSecondary: {
        fontWeight: 500,
        color: theme.palette.secondary.contrastText,
        '& svg': { stroke: theme.palette.secondary.contrastText },
      },
      outlined: {
        borderRadius: 0,
      },
      text: {
        padding: `${responsiveVal(8, 10)} ${responsiveVal(12, 22)}`,
      },
      textSecondary: {
        '& svg': { stroke: theme.palette.secondary.main },
      },
    },
    MuiFab: {
      root: {
        backgroundColor: theme.palette.background.paper,
        '&:hover': { backgroundColor: theme.palette.background.paper },
        '& svg': { stroke: theme.palette.text.primary },
      },
      colorInherit: {
        backgroundColor: 'inherit',
        '&:hover, &:focus': {
          backgroundColor: 'inherit',
        },
        boxShadow: 'none',
      },
      primary: {
        color: theme.palette.text.primary,
        '& svg': { stroke: theme.palette.text.primary },
      },
      secondary: {
        color: theme.palette.text.primary,
        // '& svg': { stroke: theme.palette.text.primary },
      },
      extended: {
        fontWeight: 400,
        textTransform: 'none',
      },
    },
    MuiInputLabel: {
      root: {
        '&$focused:not($error)': {
          color: theme.palette.secondary.main,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    MuiIconButton: {
      label: {
        stroke: theme.palette.text.primary,
      },
    },
    MuiChip: {
      root: {
        boxShadow: 'unset !important',
        borderRadius: '99em',
        height: responsiveVal(32, 40),
        paddingLeft: responsiveVal(4, 8),
        paddingRight: responsiveVal(4, 8),
        ...theme.typography.body2,
        backgroundColor: theme.palette.background.paper,
      },
      sizeSmall: {
        height: responsiveVal(26, 30),
        paddingLeft: responsiveVal(2, 6),
        paddingRight: responsiveVal(2, 6),
        ...theme.typography.caption,
      },
      outlined: {
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.default,
        // color: theme.palette.text.primary,
      },
      label: {
        paddingLeft: responsiveVal(6, 10),
        paddingRight: responsiveVal(6, 10),
      },
      labelSmall: {
        paddingLeft: responsiveVal(4, 8),
        paddingRight: responsiveVal(4, 8),
      },
      colorPrimary: {
        //
      },
      colorSecondary: {
        //
      },
      deleteIcon: {
        stroke: theme.palette.text.primary,
      },
      deleteIconOutlinedColorPrimary: {
        stroke: theme.palette.primary.main,
      },
      clickable: {
        '&:hover, &:focus': {
          backgroundColor: lighten(
            theme.palette.background.default,
            theme.palette.action.hoverOpacity,
          ),
        },
        '&.MuiChip-outlined': {
          '&:hover, &:focus': {
            backgroundColor: `${lighten(
              theme.palette.background.default,
              theme.palette.action.hoverOpacity,
            )} !important`,
          },
        },
      },
    },
    MuiCheckbox: {
      root: {
        stroke: 'none',
      },
      colorPrimary: {
        color: theme.palette.text.disabled,
        '&$checked': {
          color: theme.palette.text.disabled,
        },
      },
      colorSecondary: {
        color: theme.palette.text.disabled,
        '&$checked': {
          color: theme.palette.secondary.main,
        },
      },
    },
    MuiSvgIcon: {
      root: {
        stroke: 'none',
      },
    },
    MuiSwitch: {
      track: {
        '$colorPrimary + &': {
          backgroundColor: theme.palette.primary,
          borderRadius: 30,
        },
        '$checked$colorPrimary + &': {
          opacity: 1,
          backgroundColor: theme.palette.primary,
          borderRadius: 30,
        },
      },
      thumb: {
        backgroundColor: '#fff',
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: theme.palette.text.disabled,
      },
    },
  }
}

const currentTheme = createThemeWithPallete(useTheme === 'light' ? lightPalette : darkPalette)
currentTheme.overrides = createOverrides(currentTheme)

const ThemedProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={currentTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)
export default ThemedProvider
