import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image, isStaticImport, isStaticRequire } from '@graphcommerce/image'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, MetaRobots, PageMeta, Title } from '@graphcommerce/next-ui'
import { Container, makeStyles, Theme } from '@material-ui/core'
import cheerio from 'cheerio'
import parseHtml, { domToReact, htmlToDOM } from 'html-react-parser'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../components/AppShell/FullPageShellHeader'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery & { bodyContent: any; css: string }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: '#ff0004',
    },
  }),
  { name: 'StoryPage' },
)
const replace = (node) => {
  const attribs = node.attribs || {}
  if (
    node.name === `script` ||
    node.name === `meta` ||
    node.name === `style` ||
    node.name === `title`
  ) {
    return <></>
  }
  if (node.name === `img`) {
    const { ...props } = attribs
    return (
      <div className={props.class}>
        <Image src={props.src} layout='fill' quality={20} width={props.width ?? props.width} />
      </div>
    )
  }
  if (node.name === `link`) {
    const { ...props } = attribs
    if (props.href.indexOf('.css') < 0) {
      return <></>
    }
  }
  if (node.name === `a`) {
    const { ...props } = attribs
    return (
      <div className={props.class}>
        <PageLink key={props.href} href={props.href} passHref>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            !!node.children && !!node.children.length && domToReact(node.children, { replace })
          }
        </PageLink>
      </div>
    )
  }
}

export default function StoryPage(props: Props) {
  const { pages, bodyContent, css } = props
  const classes = useStyles()
  const page = pages?.[0]
  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

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
          <style dangerouslySetInnerHTML={{ __html: `${css}` }}></style>

          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            parseHtml(bodyContent, { replace })
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

  const webflow = await fetch('https://christmas-75f01a.webflow.io/')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const $ = cheerio.load(await webflow.text())

  const bodyContent = $(`body`).html()
  const headContent = $(`head`).html()

  let cssUrl = ''
  htmlToDOM(headContent as string).filter((tag: any) => {
    if (tag.type === 'tag' && tag.attribs.href && tag.attribs.href.indexOf('.css') >= 0) {
      cssUrl = tag.attribs.href
    }
  })

  const webflowCss = await fetch(cssUrl)
  const css = await webflowCss.text()

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
      bodyContent,
      css,
      // backgroundColor: '#ff0004 !important',
    },
    revalidate: 60 * 20,
  }
}
