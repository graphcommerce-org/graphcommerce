/// <reference types="@graphcommerce/next-ui/types" />

import {
  responsiveVal,
  breakpointVal,
  MuiButtonPill,
  MuiButtonResponsive,
  themeBaseDefaults,
  MuiSnackbar,
  MuiFabSizes,
} from '@graphcommerce/next-ui'
import { createTheme, Theme, alpha, darken, lighten } from '@mui/material'
import { Components, PaletteOptions } from '@mui/material/styles'

const main = '#85FFFD'
const dark = '#CEFF99'

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: darken(main, 0.175),
    contrastText: '#FFFFFF',
    dark: darken(dark, 0.175),
  },
  secondary: {
    main: '#006BFF',
    light: '#D1E4FF',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
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
    secondary: 'hsl(229, 16%, 71%)',
    disabled: '#00000030',
  },
}

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main,
    contrastText: '#ffffff',
    dark,
  },
  secondary: {
    main: '#62C7B0',
    light: '#62C7B0',
    contrastText: '#ffffff',
  },
  background: {
    default: '#001727',
    paper: lighten('#001727', 0.03),
    image: '#F8F8F8',
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

const fontSize = (from: number, to: number) =>
  breakpointVal('fontSize', from, to, themeBaseDefaults.breakpoints.values)

// Create a theme instance.
const createThemeWithPalette = (palette: PaletteOptions) =>
  createTheme({
    palette,
    ...themeBaseDefaults,
    shape: { borderRadius: 4 },
    typography: {
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
      // @see docs typography.md
      h1: {
        ...fontSize(36, 44),
        fontWeight: 550,
        lineHeight: 1.22,
        fontVariationSettings: palette.mode === 'dark' ? "'wght' 550" : "'wght' 610",
      },
      h2: {
        ...fontSize(24, 32),
        fontWeight: 530,
        lineHeight: 1.6,
        fontVariationSettings: palette.mode === 'dark' ? "'wght' 480" : "'wght' 590",
      },
      h3: {
        ...fontSize(18, 22),
        fontWeight: 500,
        lineHeight: 1.55,
        fontVariationSettings: palette.mode === 'dark' ? "'wght' 500" : "'wght' 560",
      },
      h4: {
        ...fontSize(18, 23),
        fontWeight: 600,
        lineHeight: 1.6,
        fontVariationSettings: "'wght' 600",
      },
      h5: {
        ...fontSize(18, 21),
        fontWeight: 480,
        lineHeight: 1.6,
        fontVariationSettings: "'wght' 510",
      },
      h6: {
        ...fontSize(16, 19),
        fontWeight: 460,
        lineHeight: 1.8,
        fontVariationSettings: "'wght' 460",
      },
      subtitle1: {
        ...fontSize(16, 19),
        fontWeight: 450,
        fontVariationSettings: "'wght' 460",
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        ...fontSize(15, 18),
        fontWeight: 370,
        fontVariationSettings: palette.mode === 'dark' ? "'wght' 450" : "'wght' 370",
        lineHeight: 1.7,
      },
      subtitle2: {
        ...fontSize(14, 16),
        fontWeight: 500,
        fontVariationSettings: "'wght' 450",
        lineHeight: 1.7,
      },
      body2: {
        ...fontSize(13, 15),
        lineHeight: 1.7,
      },
      caption: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 13),
      },
      button: {},
      overline: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 14),
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
      xl: responsiveVal(40, 100),
      xxl: responsiveVal(80, 160),
    },
    page: {
      horizontal: responsiveVal(10, 30),
      vertical: responsiveVal(10, 30),
    },
    appShell: {
      headerHeightSm: '46px',
      headerHeightMd: '80px',
      appBarHeightMd: '80px',
      appBarInnerHeightMd: '46px',
    },
  })

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
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
        willChange: 'filter',
      },
    },
  },

  MuiContainer: {
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingLeft: theme.page.horizontal,
          paddingRight: theme.page.horizontal,
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.page.horizontal,
            paddingRight: theme.page.horizontal,
          },
        },
      },
    ],
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: '16px', // https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/
      },
    },
  },

  MuiButton: {
    defaultProps: { color: 'inherit' },
    variants: [
      ...MuiButtonResponsive,
      ...MuiButtonPill,
      {
        props: { variant: 'contained', color: 'inherit' },
        style: { backgroundColor: theme.palette.background.paper },
      },
      {
        props: { variant: 'outlined' },
        style: {
          borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
        },
      },
      {
        props: { variant: 'text' },
        style: { borderRadius: '99em' },
      },
    ],
  },

  MuiFab: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
        },
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
    variants: [...MuiFabSizes],
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        '& label.Mui-focused': {
          color: theme.palette.secondary.main,
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: responsiveVal(theme.shape.borderRadius * 1.5, theme.shape.borderRadius * 2),
          '& fieldset': {
            borderColor: theme.palette.divider,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.divider,
            borderWidth: 1,
          },
        },
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
        // display: 'flex',
      },
      deleteIconOutlinedColorPrimary: {
        // color: theme.palette.primary.main,
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: {
        color: theme.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.palette.primary.main,
        },
      },
      colorSecondary: {
        color: theme.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.palette.secondary.main,
        },
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      track: {
        '.Mui-colorPrimary + &': {
          backgroundColor: theme.palette.primary,
          borderRadius: '30px',
        },
        '.Mui-checked.Mui-colorPrimary + &': {
          opacity: 1,
          backgroundColor: theme.palette.primary,
          borderRadius: '30px',
        },
      },
      thumb: {
        backgroundColor: '#fff',
      },
    },
  },

  MuiSnackbar: { variants: MuiSnackbar },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.text.disabled,
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      rail: {
        color: theme.palette.text.disabled,
      },
      thumb: {
        background: theme.palette.background.default,
        boxShadow: theme.shadows[6],
      },
    },
  },
})

export const lightTheme = createThemeWithPalette(lightPalette)
lightTheme.components = createOverrides(lightTheme)

export const darkTheme = createThemeWithPalette(darkPalette)
darkTheme.components = createOverrides(darkTheme)
