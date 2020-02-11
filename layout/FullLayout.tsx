import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import { GraphCmsPage, PageMeta, Breadcrumbs, Language } from '../graphcms'
import theme from '../theme'

const FullLayout: GraphCmsPage['getLayout'] = (page, props) => {
  return (
    <>
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
        {page}
      </ThemeProvider>
    </>
  )
}
export { FullLayout }
