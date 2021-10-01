export {}

declare module '@mui/material/styles/createPalette' {
  // interface PaletteOptions {
  //   tertiary: PaletteColorOptions
  // }
  // interface Palette {
  //   tertiary: PaletteColor & ColorPartial
  // }

  interface SimplePaletteColorOptions {
    mutedText: string
  }
  interface PaletteColor {
    mutedText: string
  }
  interface TypeBackground {
    highlight: string
  }
}

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    spacings: {
      xxs: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    page: {
      horizontal: string
      vertical: string
      headerInnerHeight: {
        xs: string
        sm: string
        md: string
      }
    }
  }
  interface ThemeOptions {
    spacings: {
      xxs: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    page: {
      horizontal: string | number
      vertical: string | number
      headerInnerHeight: {
        xs: string
        sm: string
        md: string
      }
    }
  }
}
