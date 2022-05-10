/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image } from '@graphcommerce/image'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  LayoutHeader,
  GetStaticProps,
  MetaRobots,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { Container, ButtonBase, Box } from '@mui/material'
import cheerio from 'cheerio'
import parseHtml, { domToReact } from 'html-react-parser'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { LayoutFullProps, LayoutFull } from '../../components'
import { StoryList } from '../../components/Story'
import { StoryListDocument, StoryListQuery } from '../../components/Story/StoryList.gql'
import { StoryPathsDocument } from '../../components/Story/StoryPaths.gql'
import { DefaultPageQuery, DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & StoryListQuery & { bodyContent: string | null; webflowCss: string }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
export type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function StoryPage(props: Props) {
  const router = useRouter()
  const { pages, bodyContent, webflowCss, storyList } = props
  const page = pages?.[0]

  const title = page?.title ?? ''
  const css = webflowCss.split('===== */').pop()

  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  const replace = (node) => {
    const attribs = node.attribs || {}
    if (
      node.name === `script` ||
      node.name === `meta` ||
      node.name === `webflowCss` ||
      node.name === `title`
    ) {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>
    }
    if (node.name === `img`) {
      const { ...attr } = attribs
      const width = attr.rel ? attr.rel.split(',')[0] : undefined
      const height = attr.rel ? attr.rel.split(',')[1] : undefined

      const alt =
        (attr.alt && attr.alt) ||
        (attr.class && attr.class) ||
        (node.parent.attribs.class && node.parent.attribs.class)

      return (
        <Box className={attr.class ?? attr.class} sx={{ zIndex: 1 }}>
          <Image
            src={attr.src}
            layout='fill'
            loading={attr.loading && attr.loading}
            alt={alt}
            width={width && width}
            height={height && height}
            sizes={width ? { 0: '100vw', 1350: `${width}px` } : undefined}
          />
        </Box>
      )
    }
    if (node.name === `link`) {
      const { ...attr } = attribs
      if (attr.href.indexOf('.css') < 0) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>
      }
    }
    if (node.name === `a`) {
      const { ...attr } = attribs
      return (
        <Box className={attr.class ?? attr.class} sx={{ zIndex: 1 }}>
          <PageLink key={attr.href} href={attr.href} passHref>
            <ButtonBase
              component='a'
              aria-label={attr.class ?? attr.class}
              sx={{ display: 'block' }}
            >
              {!!node.children && !!node.children.length && domToReact(node.children, { replace })}
            </ButtonBase>
          </PageLink>
        </Box>
      )
    }
    if (node.name === `video`) {
      const { style, ...attr } = attribs

      return (
        <Box>
          <video style={{ width: '100%' }} autoPlay muted loop playsInline disableRemotePlayback>
            {!!node.children && !!node.children.length && domToReact(node.children, { replace })}
          </video>
        </Box>
      )
    }
    return false
  }

  return (
    <>
      <PageMeta
        title={page?.metaTitle ?? title ?? ''}
        metaDescription={page?.metaDescription ?? ''}
        metaRobots={metaRobots}
        canonical={page?.url === 'page/home' ? '/' : `/${page?.url}`}
      />

      <LayoutHeader floatingMd floatingSm>
        {router.pathname.split('?')[0] !== '/' && (
          <LayoutTitle component='span' size='small'>
            {title}
          </LayoutTitle>
        )}
      </LayoutHeader>

      <Container maxWidth={false} disableGutters>
        <StoryList storyList={storyList} current={page.url} />
        <Box
          css={{ css }}
          sx={{ '& img': { verticalAlign: 'bottom', lineHeight: 0, filter: 'none' } }}
        >
          {parseHtml(bodyContent as string, { replace })}
        </Box>
      </Container>
    </>
  )
}

StoryPage.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default StoryPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // if (process.env.VERCEL_ENV !== 'production') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient(locale)
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
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

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
  const cssFile = await fetch(`${cssUrl}?updated=${Math.random() * 9999}`)
  const webflowCss = await cssFile.text()

  return {
    props: {
      ...(await page).data,
      ...(await storyList).data,
      apolloState: await conf.then(() => client.cache.extract()),
      bodyContent,
      webflowCss,
    },
    revalidate: 60 * 20,
  }
}
