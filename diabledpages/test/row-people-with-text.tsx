import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { GraphCMS } from '../../components/RowPeopleWithText/index.stories'
import { theme } from '../../components/PageLayout'

const Page = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {GraphCMS()}
    </ThemeProvider>
  )
}

export default Page
