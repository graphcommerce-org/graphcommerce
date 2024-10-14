/// <reference types="@graphcommerce/next-ui/types" />

import {
  responsiveVal,
  breakpointVal,
  MuiButtonPill,
  MuiButtonResponsive,
  themeBaseDefaults,
  MuiSnackbar,
  MuiFabSizes,
  MuiSlider,
  MuiChip,
  MuiButtonInline,
  NextLink,
} from '@graphcommerce/next-ui'
import { Theme, LinkProps } from '@mui/material'
import { Components, PaletteOptions, createTheme } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#47C489',
    contrastText: '#ffffff',
    dark: '#47C489',
  },
  secondary: {
    main: '#006bff',
    light: '#d1e4ff',
    contrastText: '#ffffff',
  },
  background: {
    default: '#F9F9FA',
    paper: '#ffffff',
    image: '#ffffff',
  },
  divider: '#00000015',
  success: {
    main: '#01d26a',
  },
  action: {
    hoverOpacity: 0.12,
  },
  text: {
    primary: '#0F0F10',
    secondary: '#03031755',
    disabled: '#03031735',
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
    main: '#62C7B0',
    light: '#62C7B0',
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

const fontSize = (from: number, to: number) =>
  breakpointVal('fontSize', from, to, themeBaseDefaults.breakpoints.values)

// Create a theme instance.
const createThemeWithPalette = ({
  light,
  dark,
}: {
  light?: PaletteOptions
  dark?: PaletteOptions
}) =>
  createTheme({
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      ...(light ? { light: { palette: light } } : undefined),
      ...(dark ? { dark: { palette: dark } } : undefined),
    },
    ...themeBaseDefaults,
    shape: { borderRadius: 3 },
    typography: {
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
      // @see docs typography.md
      h1: {
        ...fontSize(28, 64),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.22,
      },
      h2: {
        ...fontSize(25, 40),
        fontWeight: 700,
        fontVariationSettings: "'wght' 630",
        lineHeight: 1.35,
      },
      h3: {
        ...fontSize(22, 30),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.55,
      },
      h4: {
        ...fontSize(18, 26),
        fontWeight: 550,
        fontVariationSettings: "'wght' 550",
        lineHeight: 1.55,
      },
      h5: {
        ...fontSize(17, 20),
        fontWeight: 650,
        fontVariationSettings: "'wght' 650",
        lineHeight: 1.55,
      },
      h6: {
        ...fontSize(17, 20),
        fontWeight: 550,
        fontVariationSettings: "'wght' 510",
        lineHeight: 1.8,
      },
      subtitle1: {
        ...fontSize(16, 19),
        fontWeight: 450,
        fontVariationSettings: "'wght' 460",
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        ...fontSize(14, 18),
        lineHeight: 1.7,
      },
      subtitle2: {
        ...fontSize(14, 16),
        fontWeight: 500,
        fontVariationSettings: "'wght' 520",
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
      headerHeightMd: '100px',
      appBarHeightMd: '80px',
      appBarInnerHeightMd: '46px',
    },
  })

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components<Theme> => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        overflowY: 'scroll',
      },
      '::selection': { background: `rgb(${theme.vars.palette.primary.mainChannel}/ 0.6)` },
      '::-moz-selection': { background: `rgb(${theme.vars.palette.primary.mainChannel}/ 0.6)` },
      '#__next': {
        position: 'relative',
      },
      'picture img': {
        filter: 'brightness(1.03)',
        willChange: 'filter',
      },
    },
  },

  // https://mui.com/material-ui/guides/routing/#global-theme-link
  // https://www.graphcommerce.org/docs/framework/links
  MuiLink: { defaultProps: { component: NextLink } as LinkProps },
  MuiButtonBase: { defaultProps: { LinkComponent: NextLink } },

  MuiContainer: {
    styleOverrides: {
      root: {
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
    },
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
    styleOverrides: {
      root: {
        variants: [
          ...MuiButtonResponsive,
          ...MuiButtonPill,
          ...MuiButtonInline,
          {
            props: { variant: 'contained', color: 'inherit' },
            style: { backgroundColor: theme.vars.palette.background.paper },
          },
          {
            props: { variant: 'outlined' },
            style: {
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
                theme.breakpoints.values,
              ),
            },
          },
          {
            props: { variant: 'text' },
            style: { borderRadius: '99em' },
          },
          {
            props: { variant: 'inline' },
            style: { borderRadius: '99em' },
          },
          {
            props: { color: 'primary' },
            style: {
              '&:not(.Mui-disabled)': {
                boxShadow: 'none',
              },
            },
          },
          {
            props: { color: 'secondary' },
            style: {
              '&:not(.Mui-disabled)': {
                boxShadow: 'none',
              },
            },
          },
        ],
      },
    },
  },

  MuiFab: {
    styleOverrides: {
      root: {
        '&.MuiFab-default': {
          backgroundColor: theme.vars.palette.background.paper,
          '&:hover': {
            backgroundColor: theme.vars.palette.background.paper,
          },
          color: theme.vars.palette.text.primary,
        },
      },
      colorInherit: {
        backgroundColor: 'inherit',
        '&:hover, &:focus': {
          backgroundColor: 'inherit',
        },
        boxShadow: 'none',
      },
      extended: {
        fontWeight: 400,
        textTransform: 'none',
      },
    },

    variants: [...MuiFabSizes],
  },

  MuiTextField: {
    defaultProps: { color: 'secondary' },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 1.5,
            theme.shape.borderRadius * 2,
            theme.breakpoints.values,
          ),
        },
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: theme.vars.palette.text.primary,
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        variants: [...MuiChip],
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: {
        color: theme.vars.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.vars.palette.primary.main,
        },
      },
      colorSecondary: {
        color: theme.vars.palette.text.disabled,
        '&.Mui-checked': {
          color: theme.vars.palette.secondary.main,
        },
      },
    },

    variants: [
      {
        props: { size: 'medium' },
        style: {
          padding: 7,
        },
      },
    ],
  },

  MuiSwitch: {
    styleOverrides: {
      thumb: {
        boxShadow: theme.shadows[6],
      },
    },
  },

  MuiSnackbar: {
    styleOverrides: {
      root: { variants: [...MuiSnackbar] },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.vars.palette.text.disabled,
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: { variants: [...MuiSlider] },
    },
  },

  MuiCircularProgress: {
    defaultProps: {
      thickness: 2,
    },
  },
})

export const theme = createThemeWithPalette({ light: lightPalette, dark: darkPalette })
theme.components = createOverrides(theme) as Components
