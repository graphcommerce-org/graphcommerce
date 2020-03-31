import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { GraphCmsPage, PageMeta, Breadcrumbs, Language } from '../graphcms'

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

const FullLayout: GraphCmsPage['layout'] = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name='theme-color' content={theme.palette.primary.main} />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <CssBaseline />
      <PageMeta {...props} />
      <Breadcrumbs {...props} />
      <Language {...props} />
      {children}
    </ThemeProvider>
  )
}

export { FullLayout }
