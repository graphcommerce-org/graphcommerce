/// <reference types="@graphcommerce/next-ui/types" />

import { responsiveVal, breakpointVal } from '@graphcommerce/next-ui'
import { createTheme, Theme, alpha, adaptV4Theme } from '@mui/material'
import { Components, PaletteOptions } from '@mui/material/styles'
import shadows from './shadows'

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1536,
  xl: 1920,
}

const lightPalette: PaletteOptions = {
  mode: 'light',
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
    default: '#f9f9f9',
    paper: '#ffffff',
    image: '#ffffff',
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
  mode: 'dark',
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
    paper: '#15293B',
    image: '#ffffff',
  },
  divider: '#ffffff30',
  success: {
    main: '#01D26A',
  },
  action: {
    hoverOpacity: 0.16,
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffffff80',
    disabled: '#ffffff30',
  },
}

// Create a theme instance.
const createThemeWithPalette = (palette: PaletteOptions) =>
  createTheme({
    palette,
    breakpoints: {
      values: breakpoints,
    },
    shadows,
    shape: {
      borderRadius: 4,
    },
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
        ...breakpointVal('fontSize', 28, 64, breakpoints),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.22,
      },
      h2: {
        ...breakpointVal('fontSize', 25, 40, breakpoints),
        fontWeight: 700,
        fontVariationSettings: "'wght' 630",
        lineHeight: 1.35,
      },
      h3: {
        ...breakpointVal('fontSize', 22, 30, breakpoints),
        fontWeight: 700,
        fontVariationSettings: "'wght' 680",
        lineHeight: 1.55,
      },
      h4: {
        ...breakpointVal('fontSize', 18, 26, breakpoints),
        fontWeight: 500,
        fontVariationSettings: "'wght' 520",
        lineHeight: 1.55,
      },
      h5: {
        ...breakpointVal('fontSize', 17, 20, breakpoints),
        fontWeight: 700,
        fontVariationSettings: "'wght' 680",
        lineHeight: 1.55,
      },
      h6: {
        ...breakpointVal('fontSize', 17, 20, breakpoints),
        fontWeight: 550,
        fontVariationSettings: "'wght' 530",
        lineHeight: 1.8,
      },
      subtitle1: {
        ...breakpointVal('fontSize', 16, 19, breakpoints),
        fontWeight: 400,
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        ...breakpointVal('fontSize', 16, 18, breakpoints),
        lineHeight: 1.7,
      },
      subtitle2: {
        ...breakpointVal('fontSize', 14, 16, breakpoints),
        fontWeight: 600,
        lineHeight: 1.7,
      },
      body2: {
        ...breakpointVal('fontSize', 13, 15, breakpoints),
        lineHeight: 1.7,
      },
      // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
      caption: {
        ...breakpointVal('fontSize', 12, 13, breakpoints),
      },
      button: {},
      overline: {
        ...breakpointVal('fontSize', 12, 14, breakpoints),
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
    },
    appShell: {
      headerHeightSm: '46px',
      headerHeightMd: '110px',
      appBarHeightMd: '80px',
      appBarInnerHeightMd: '46px',
    },
  })

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    pill: true
  }
}

const createOverrides = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      '@global': {
        body: {
          overflowY: 'scroll',
        },
        '::selection': { background: alpha(theme.palette.primary.main, 0.6) },
        '::-moz-selection': { background: alpha(theme.palette.primary.main, 0.6) },
        '#__next': {
          position: 'relative',
        },
        img: {
          filter: 'brightness(1.03)',
        },
      },
    },
  },

  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: theme.page.horizontal,
        paddingRight: theme.page.horizontal,
        [theme.breakpoints.up('sm')]: {
          paddingLeft: undefined,
          paddingRight: undefined,
        },
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        ...theme.typography.body2,
        fontWeight: 400,
        padding: `${responsiveVal(8, 10)} ${responsiveVal(16, 20)}`,
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

        '&:hover': {
          background: undefined,
        },
        '&:focus': {
          background: undefined,
        },
      },
      containedPrimary: {
        fontWeight: 500,
        color: theme.palette.primary.contrastText,
      },
      containedSecondary: {
        fontWeight: 500,
        color: theme.palette.secondary.contrastText,
      },
      outlined: {
        borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
      },
      text: {
        padding: `${responsiveVal(8, 10)} ${responsiveVal(12, 22)}`,
      },
    },
  },

  MuiFab: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        '&:hover': { backgroundColor: theme.palette.background.paper },
        color: theme.palette.text.primary,
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
      },
      secondary: {
        color: theme.palette.text.primary,
      },
      extended: {
        fontWeight: 400,
        textTransform: 'none',
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&$focused:not($error)': {
          color: theme.palette.secondary.main,
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: responsiveVal(theme.shape.borderRadius * 1.5, theme.shape.borderRadius * 2),
        '&$focused $notchedOutline': {
          borderColor: theme.palette.divider,
          borderWidth: 1,
        },
      },
      notchedOutline: {
        borderColor: theme.palette.divider,
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        boxShadow: 'unset !important',
        borderRadius: '99em',
        height: responsiveVal(32, 40),
        paddingLeft: responsiveVal(4, 8),
        paddingRight: responsiveVal(4, 8),
        ...theme.typography.body2,
      },
      sizeSmall: {
        height: responsiveVal(26, 30),
        paddingLeft: responsiveVal(3, 6),
        paddingRight: responsiveVal(3, 6),
        ...theme.typography.caption,
      },
      outlined: {
        borderColor: theme.palette.divider,
      },
      label: {
        paddingLeft: responsiveVal(6, 10),
        paddingRight: responsiveVal(6, 10),
      },
      labelSmall: {
        paddingLeft: responsiveVal(6, 8),
        paddingRight: responsiveVal(6, 8),
      },
      deleteIcon: {
        color: theme.palette.text.primary,
      },
      deleteIconOutlinedColorPrimary: {
        color: theme.palette.primary.main,
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: {
        color: theme.palette.text.disabled,
        '&$checked': {
          color: theme.palette.primary.main,
        },
      },
      colorSecondary: {
        color: theme.palette.text.disabled,
        '&$checked': {
          color: theme.palette.secondary.main,
        },
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
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
  },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.text.disabled,
      },
    },
  },
})

export const lightTheme = createThemeWithPalette(lightPalette)
lightTheme.components = lightTheme.overrides = createOverrides(lightTheme)

export const darkTheme = createThemeWithPalette(darkPalette)
darkTheme.overrides = createOverrides(darkTheme)
