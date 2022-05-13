import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  LayoutTitle,
  GetStaticProps,
  LayoutOverlay,
  LayoutOverlayHeader,
  LayoutOverlayProps,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, List } from '@mui/material'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LayoutFullProps } from '../../components'
import { MenuItem } from '../../components/Menu/MenuItem'
import { MenuPageQuery, MenuPageDocument } from '../../graphql/MenuPage.gql'
import { PagesStaticPathsDocument } from '../../graphql/PagesStaticPaths.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = MenuPageQuery & { isRoot: boolean }
type RouteProps = { url?: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function MenuPage({ categories, isRoot }: Props) {
  const root = categories?.items?.[0]
  const [activeIndex, setActiveIndex] = useState(0)
  const { asPath } = useRouter()
  const canonical = asPath === '/menu' ? '/' : asPath.replace('/menu', '')

  if (!root) return null

  let { name } = root
  name = name?.toLocaleLowerCase()
  const viewAllLinkProps = {
    ...root,
    name: `${i18n._(/* i18n */ `View all`)} ${name}`,
    children: null,
  }
  const title = root.name || ''

  return (
    <>
      <PageMeta title={title} metaDescription={title} canonical={canonical || undefined} />
      <LayoutOverlayHeader
        switchPoint={0}
        sx={(theme) => ({
          '&.noAlign': { mb: 0 },
          // [theme.breakpoints.down('sm')]: {
          //   '& .LayoutHeaderContent-bg': {
          //     background: `none`,
          //   },
          //   '& .MuiFab-root': {
          //     background: `none`,
          //   },
          // },
        })}
      >
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Box maxWidth='md'>
        <List
          disablePadding
          sx={(theme) => ({
            display: 'grid',
            gridTemplateRows: 'auto',
            [theme.breakpoints.up('md')]: {
              background: theme.palette.background.default,
              gridTemplate: '"nav items"/1fr 2fr',
              minWidth: '960px',
            },
            '& > li:nth-of-type(1) > a': {
              [theme.breakpoints.up('md')]: {
                marginTop: theme.spacings.md,
              },
            },
          })}
        >
          {!isRoot && <MenuItem {...viewAllLinkProps} />}
          {root.children?.map((item, index) => {
            if (!item) return null
            return (
              <MenuItem
                key={item.uid}
                {...item}
                index={index}
                setActiveIndex={setActiveIndex}
                active={index === activeIndex}
              />
            )
          })}
        </List>
      </Box>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'left',
    justifyMd: 'start',
    sizeMd: 'floating',
    sizeSm: 'floating',
    sx: {
      '& .LayoutOverlayBase-overlayPane.sizeMdFloating': {
        overflow: 'hidden',
        borderRadius: {
          md: 2,
        },
      },
      '&.Scroller-root': {
        touchAction: `pan-y`,
      },
    },
  },
}
MenuPage.pageOptions = pageOptions

export default MenuPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = async (locale: string) => {
    const client = graphqlSsrClient(locale)
    const { data } = await client.query({
      query: PagesStaticPathsDocument,
      variables: {
        first: process.env.VERCEL_ENV !== 'production' ? 1 : 1000,
        urlStartsWith: 'menu',
      },
    })
    return data.pages.map((page) => ({ params: { url: page.url.split('/').slice(1) }, locale }))
  }
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const url = params?.url ? `menu/${params?.url.join('/')}` : `menu`
  const urlKey = params?.url?.join('/')
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const rootCategory = (await conf).data.storeConfig?.root_category_uid ?? ''

  const page = staticClient.query({
    query: MenuPageDocument,
    variables: urlKey ? { urlKey } : { rootCategory },
  })

  const isRoot = url === 'menu'

  const unslugify = (slug: string) =>
    slug
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (txt) => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`)

  const parentLink =
    params?.url?.length === 1
      ? { href: '/menu', title: 'Producten' }
      : {
          href: `/menu/${params?.url?.slice(0, -1).join('/')}`,
          title: unslugify(params?.url?.[(params?.url?.length || 0) - 2] || '') || '',
        }
  const up = isRoot ? null : parentLink

  return {
    props: {
      ...(await page).data,
      isRoot,
      up,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
