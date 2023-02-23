import { createTheme as createMuiTheme, ThemeOptions } from '@mui/material'
import { createResponsiveTemplate, ResponsiveTemplate, ResponsiveValue } from '../Styles/spreadVal'
import { breakpoints } from './breakpoints'
import { themeBaseDefaults } from './themeDefaults'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    image: string
  }
}

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    spacings: {
      xxs: ResponsiveValue | string
      xs: ResponsiveValue | string
      sm: ResponsiveValue | string
      md: ResponsiveValue | string
      lg: ResponsiveValue | string
      xl: ResponsiveValue | string
      xxl: ResponsiveValue | string
    }
    page: {
      horizontal: ResponsiveValue | string
      vertical: ResponsiveValue | string
    }
    appShell: {
      headerHeightSm: ResponsiveValue | string
      headerHeightMd: ResponsiveValue | string
      appBarHeightMd: ResponsiveValue | string
      appBarInnerHeightMd: ResponsiveValue | string
    }
    responsiveTemplate: ResponsiveTemplate

    // todo: should be cleaned up to be compatible with the default mui-styles
    shape: { borderRadius: number }
  }
  interface Theme {
    spacings: {
      xxs: ResponsiveValue | string
      xs: ResponsiveValue | string
      sm: ResponsiveValue | string
      md: ResponsiveValue | string
      lg: ResponsiveValue | string
      xl: ResponsiveValue | string
      xxl: ResponsiveValue | string
    }
    page: {
      horizontal: ResponsiveValue | string
      vertical: ResponsiveValue | string
    }
    appShell: {
      headerHeightSm: ResponsiveValue | string
      headerHeightMd: ResponsiveValue | string
      appBarHeightMd: ResponsiveValue | string
      appBarInnerHeightMd: ResponsiveValue | string
    }
    responsiveTemplate: ResponsiveTemplate

    // todo: should be cleaned up to be compatible with the default mui-styles
    shape: { borderRadius: number }
  }
}

type ThemeOptionsWithDefaults = Omit<ThemeOptions, 'responsiveTemplate'>

export const baseTheme = createMuiTheme()

export const createTheme = (options: ThemeOptionsWithDefaults) =>
  createMuiTheme({
    ...options,
    ...themeBaseDefaults,
    breakpoints: { ...breakpoints, ...options.breakpoints },
    responsiveTemplate: createResponsiveTemplate(options.breakpoints?.values ?? breakpoints.values),
  })
