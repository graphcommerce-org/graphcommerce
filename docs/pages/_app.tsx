import { App, AppProps } from '@graphcommerce/next-ui'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import React from 'react'
import { lightTheme } from '../components/Theme/ThemedProvider'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export default function Docs(props: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <App {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
