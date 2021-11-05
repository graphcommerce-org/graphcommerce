import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image, isStaticImport, isStaticRequire } from '@graphcommerce/image'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, MetaRobots, PageMeta, Title } from '@graphcommerce/next-ui'
import { Container, makeStyles, Theme } from '@material-ui/core'
import axios from 'axios'
import cheerio from 'cheerio'
import parseHtml, { domToReact } from 'html-react-parser'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../components/AppShell/FullPageShellHeader'
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
      '& .ignore': {
        pointerEvents: 'none',
      },
    },
  }),
  { name: 'StoryPage' },
)

function replace(node) {
  const attribs = node.attribs || {}
  if (node.name === `img`) {
    const { ...props } = attribs
    return (
      <div className={props.class}>
        {/* {console.log({ ...props })} */}
        <Image src={props.src} layout='fill' quality={20} />
      </div>
    )
  }
  if (node.name === `script`) {
    return <></>
  }
  if (node.name === `a`) {
    const { ...props } = attribs
    return (
      <div className={props.class}>
        {/* {console.log({ ...props })} */}
        <PageLink key={props.href} href={props.href} passHref>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            !!node.children && !!node.children.length && domToReact(node.children, parseOptions)
          }
        </PageLink>
      </div>
    )
  }
}

const parseOptions = { replace }

export default function StoryPage({ pages, bodyContent, headContent }) {
  const classes = useStyles()
  const page = pages?.[0]
  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  const head = parseHtml(headContent as string)
  const importCss = head.filter((rule) => {
    if (rule.type === 'link') {
      if (rule.props.href.indexOf('.css') >= 0) {
        return true
      }
    }
  })

  // const fetchCss = async () => {
  //   return fetch(importCss[0].props.href as string)
  //     .then((res) => res.text())
  //     .then((res) => {
  //       return res
  //     })
  // }

  // fetchCss()

  // eslint-disable-next-line
  return (
    <>
      <PageMeta
        title={page?.metaTitle ?? ''}
        metaDescription={page?.metaDescription ?? ''}
        metaRobots={metaRobots}
      />

      <FullPageShellHeader>
        <Title size='small'>{page?.title}</Title>
      </FullPageShellHeader>

      <Container maxWidth={false} disableGutters>
        <div className={classes.root}>
          <link rel='stylesheet' href={importCss[0].props.href} />
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            parseHtml(bodyContent, parseOptions)
          }
        </div>
      </Container>
    </>
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

  // const head = parseHtml(headContent as string)

  // const importCssUrl = head.filter((rule) => {
  //   if (rule.type === 'link') {
  //     if (rule.props.href.indexOf('.css') >= 0) {
  //       return true
  //     }
  //   }
  // })

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
      backgroundColor: '#ff0004 !important',
    },
    revalidate: 60 * 20,
  }
}
