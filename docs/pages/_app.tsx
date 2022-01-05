import { App, AppProps } from '@graphcommerce/next-ui'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material'
import React from 'react'
import { lightTheme } from '../components/Theme/ThemedProvider'

export default function Docs(props: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <App {...props} />
    </ThemeProvider>
  )
}
