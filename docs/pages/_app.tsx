import { App, AppProps } from '@graphcommerce/next-ui'
import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import { lightTheme } from '../components/Theme/ThemedProvider'

export default function Docs(props: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <App {...props} />
    </ThemeProvider>
  )
}
