import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image } from '@graphcommerce/image'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, MetaRobots, PageMeta, Title } from '@graphcommerce/next-ui'
import { Container, makeStyles } from '@material-ui/core'
import cheerio from 'cheerio'
import parseHtml, { domToReact, htmlToDOM } from 'html-react-parser'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../components/AppShell/FullPageShellHeader'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import { PagesStaticPathsDocument } from '../../components/GraphQL/PagesStaticPaths.gql'
import StoryList from '../../components/Story'
import { StoryListDocument, StoryListQuery } from '../../components/Story/StoryList.gql'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery & StoryListQuery & { bodyContent: any; css: string; bgColor: string }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const useStyles = makeStyles(
  () => ({
    root: {
      backgroundColor: (props: Props) => props.bgColor,
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
    const width = props.rel ? props.rel.split(',')[0] : undefined
    const height = props.rel ? props.rel.split(',')[1] : undefined

    return (
      <div className={props.class}>
        <Image
          src={props.src}
          layout='fill'
          quality={width && width > 1080 ? 20 : 92}
          width={width && width}
          height={height && height}
        />
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
  const { pages, bodyContent, css, storyList } = props
  const classes = useStyles(props)
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
        <StoryList storyList={storyList} current={page.url} />
        <div className={classes.root}>
          <style dangerouslySetInnerHTML={{ __html: `${css}` }}></style>

          {parseHtml(bodyContent as string, { replace })}
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

  const path = async (locale: string) => {
    const client = apolloClient(locale)
    const { data } = await client.query({
      query: PagesStaticPathsDocument,
      variables: {
        first: process.env.VERCEL_ENV !== 'production' ? 1 : 1000,
        urlStartsWith: 'story',
      },
    })
    return data.pages.map((page) => ({ params: { url: page.url.split('/').slice(1) }, locale }))
  }
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `story/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  const storyList = staticClient.query({
    query: StoryListDocument,
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  const webflow = await fetch(`https://${(urlKey as string).split('/').pop()}.webflow.io/`)

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

  return {
    props: {
      ...(await page).data,
      ...(await storyList).data,
      apolloState: await conf.then(() => client.cache.extract()),
      bodyContent,
      css,
      bgColor: '#ffffff',
    },
    revalidate: 60 * 20,
  }
}
