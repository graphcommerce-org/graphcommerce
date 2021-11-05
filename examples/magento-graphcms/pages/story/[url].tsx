import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image, isStaticImport, isStaticRequire } from '@graphcommerce/image'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui'
import { Container, makeStyles, Theme } from '@material-ui/core'
import axios from 'axios'
import cheerio from 'cheerio'
import parseHtml, { domToReact } from 'html-react-parser'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      // opacity: 0.1,
    },
  }),
  { name: 'StoryPage' },
)

// Replaces DOM nodes with React components
function replace(node) {
  const attribs = node.attribs || {}

  // Replace links with Next links
  if (node.name === `img`) {
    const { ...props } = attribs

    return (
      <div className={props.class}>
        {/* {console.log({ ...props })} */}
        <Image src={props.src} layout='fill' />
      </div>
    )
  }
}

const parseOptions = { replace }

export default function StoryPage({ pages, bodyContent, headContent }) {
  const classes = useStyles()
  // eslint-disable-next-line
  return (
    <Container maxWidth={false} disableGutters>
      <div className={classes.root}>
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          parseHtml(headContent)
        }
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          parseHtml(bodyContent, parseOptions)
        }
      </div>
    </Container>
  )
}

StoryPage.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const { data } = await axios.get('https://christmas-75f01a.webflow.io/')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const $ = cheerio.load(data)
  const bodyContent = $(`body`).html()
  const headContent = $(`head`).html()

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `story/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }
  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
      headContent,
      bodyContent,
      backgroundColor: '',
    },
    revalidate: 60 * 20,
  }
}
