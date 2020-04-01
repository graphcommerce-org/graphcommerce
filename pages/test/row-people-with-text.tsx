import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { GraphCMS } from '../../components/RowPeopleWithText/index.stories'
import { theme } from '../../layout/FullLayout'

const Page = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {GraphCMS()}
    </ThemeProvider>
  )
}

export default Page
