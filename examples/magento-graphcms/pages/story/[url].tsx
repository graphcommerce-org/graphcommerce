import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image } from '@graphcommerce/image'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, MetaRobots, PageMeta, Title } from '@graphcommerce/next-ui'
import { ButtonBase, Container } from '@material-ui/core'
import cheerio from 'cheerio'
import parseHtml, { domToReact } from 'html-react-parser'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../components/AppShell/FullPageShellHeader'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import StoryList from '../../components/Story'
import { StoryListDocument, StoryListQuery } from '../../components/Story/StoryList.gql'
import { StoryPathsDocument } from '../../components/Story/StoryPaths.gql'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery & StoryListQuery & { bodyContent: string | null; css: string }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

export default function StoryPage(props: Props) {
  const { pages, bodyContent, css, storyList } = props
  const page = pages?.[0]
  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

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
      const { ...attr } = attribs
      const width = attr.rel ? attr.rel.split(',')[0] : undefined
      const height = attr.rel ? attr.rel.split(',')[1] : undefined

      const alt = (attr: any) => {
        return (
          (attr.alt && attr.alt) ||
          (attr.class && attr.class) ||
          (node.parent.attribs.class && node.parent.attribs.class)
        )
      }
      return (
        <div className={attr.class ?? attr.class}>
          <Image
            src={attr.src}
            layout='fill'
            loading={attr.loading && attr.loading}
            alt={alt(attr)}
            width={width && width}
            height={height && height}
            sizes={width ? { 0: '100vw', 1350: `${width}px` } : undefined}
          />
        </div>
      )
    }
    if (node.name === `link`) {
      const { ...attr } = attribs
      if (attr.href.indexOf('.css') < 0) {
        return <></>
      }
    }
    if (node.name === `a`) {
      const { ...attr } = attribs
      return (
        <div className={attr.class ?? attr.class}>
          <PageLink key={attr.href} href={attr.href} passHref>
            <ButtonBase
              component='a'
              aria-label={attr.class ?? attr.class}
              style={{ display: 'block' }}
            >
              {!!node.children && !!node.children.length && domToReact(node.children, { replace })}
            </ButtonBase>
          </PageLink>
        </div>
      )
    }
  }

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
        <div>
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
  if (process.env.VERCEL_ENV !== 'production') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = apolloClient(locale)
    const StoryPaths = staticClient.query({ query: StoryPathsDocument })
    const { pages } = (await StoryPaths).data
    return (
      pages.map((page) => ({ params: { url: `${page?.url}`.replace('story/', '') }, locale })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)
  return {
    paths: process.env.VERCEL_ENV !== 'production' ? paths.slice(0, 1) : paths,
    fallback: 'blocking',
  }
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

  const webflow = await fetch(`https://${urlKey.split('/').pop()}.webflow.io/`)

  const $ = cheerio.load(await webflow.text())

  const bodyContent = $(`body`).html()
  const headContent = $(`head`).html()

  const cssUrl = headContent?.match('(?<=href=")[^"]+.css')?.[0]
  const webflowCss = await fetch(`${cssUrl}?updated=${Math.random() * 9999}`)
  const css = await webflowCss.text()

  return {
    props: {
      ...(await page).data,
      ...(await storyList).data,
      apolloState: await conf.then(() => client.cache.extract()),
      bodyContent,
      css,
    },
    revalidate: 60 * 20,
  }
}
