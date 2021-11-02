export {}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    image: string
  }
}

declare module '@material-ui/core/styles/createTheme' {
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
