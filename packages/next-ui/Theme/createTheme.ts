export {}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    image: string
  }
}

declare module '@mui/material/styles/createTheme' {
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
      horizontal: string
      vertical: string
    }
    appShell: {
      headerHeightSm: string
      headerHeightMd: string
      appBarHeightMd: string
      appBarInnerHeightMd: string
    }

    // todo: should be cleaned up to be compatible with the default mui-styles
    shape: { borderRadius: number }
  }
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
      horizontal: string | number
      vertical: string | number
    }
    appShell: {
      headerHeightSm: string
      headerHeightMd: string
      appBarHeightMd: string
      appBarInnerHeightMd: string
    }

    // todo: should be cleaned up to be compatible with the default mui-styles
    shape: { borderRadius: number }
  }
}
