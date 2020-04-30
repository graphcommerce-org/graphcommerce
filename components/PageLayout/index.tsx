import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Head from 'next/head'
import Error from 'next/error'
import PageMeta from '../PageMeta'
import ThemedProvider, { defaultTheme } from '../Theme'
import { LayoutPage } from '../../lib/layout'
import Header from '../Header'
import PageLoadIndicator from '../PageLoadIndicator'
import { GQLGetStaticProps } from '../../lib/staticParams'
import Footer from '../Footer'

export type PageLayoutProps = Omit<GQLGetPageLayoutQuery, 'pages'> & {
  page: GQLGetPageLayoutQuery['pages'][0]
}

export type PageWithLayoutFull<T = {}> = LayoutPage<PageLayoutProps & T, PageLayoutProps>

const LayoutFull: PageWithLayoutFull['layout'] = ({ children, page, header, footer }) => {
  if (!page?.url) return <Error statusCode={404} title='Page not found' />
  if (!header) return <Error statusCode={500} title='Header not loaded' />
  if (!footer) return <Error statusCode={500} title='Footer not loaded' />

  return (
    <ThemedProvider>
      <Head>
        <meta name='theme-color' content={defaultTheme.palette.primary.main} />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline />
      <PageMeta {...page} />
      <PageLoadIndicator />
      <Header {...header} {...page} />
      {children}
      <Footer {...footer} />
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}

export default LayoutFull

export const getStaticProps: GQLGetStaticProps<PageLayoutProps> = async (variables) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetPageLayoutDocument } = await import('../../generated/apollo')
  const { getStaticProps: get } = await import('../ContentRenderer/ContentRenderer')

  try {
    const { data } = await client().query<GQLGetPageLayoutQuery, GQLGetPortfolioListQueryVariables>(
      {
        query: GetPageLayoutDocument,
        variables,
      },
    )

    const { pages, ...rest } = data
    const page = pages[0]

    page.content = await get(page.content)
    return { ...rest, page: pages[0] }
  } catch (error) {
    return {
      page: {} as GQLPageLayoutFragment,
      team: [],
    }
  }
}
