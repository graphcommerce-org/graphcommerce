import '@graphcommerce/next-ui/types'
import { containerSizingContent, containerSizingShell } from '@graphcommerce/next-config/config'
import {
  breakpointVal,
  createTheme,
  MuiButtonInline,
  MuiButtonPill,
  MuiButtonResponsive,
  MuiChip,
  MuiFabSizes,
  MuiSlider,
  MuiSnackbar,
  NextLink,
  responsiveVal,
  themeBaseDefaults,
} from '@graphcommerce/next-ui'
import type { LinkProps, Theme } from '@mui/material'
import type { Components, PaletteOptions } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#000000',
    contrastText: '#ffffff',
    dark: '#000000',
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
    main: '#006bff',
    contrastText: '#ffffff',
    dark: '#0056d2',
  },
  secondary: {
    main: '#78909c',
    light: '#b0bec5',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
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
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class', cssVarPrefix: '', nativeColor: true },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
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
    containerSizingShell: containerSizingShell === 'BREAKPOINT' ? 'xl' : false,
    containerSizingContent: containerSizingContent === 'BREAKPOINT' ? 'xl' : false,
  },
})

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components<Theme> => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        overflowY: 'scroll',
      },
      '::selection': { background: `rgb(${theme.vars.palette.primary.mainChannel} / 0.6)` },
      '::-moz-selection': { background: `rgb(${theme.vars.palette.primary.mainChannel} / 0.6)` },
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
    variants: [...MuiChip],
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

  MuiSnackbar: { variants: [...MuiSnackbar] },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.vars.palette.text.disabled,
      },
    },
  },

  MuiSlider: { variants: [...MuiSlider] },

  MuiCircularProgress: {
    defaultProps: {
      thickness: 2,
    },
  },
})

theme.components = createOverrides(theme) as never

export { theme }
