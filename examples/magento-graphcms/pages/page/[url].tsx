import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CmsPageContent } from '@graphcommerce/magento-cms'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, MetaRobots, responsiveVal, SvgImageSimple } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import { CmsPageDocument, CmsPageQuery } from '../../components/GraphQL/CmsPage.gql'
import { DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import RowRenderer from '../../components/Row/RowRenderer'
import RowProduct from '../../components/Row/RowProduct'
import apolloClient from '../../lib/apolloClient'
import { Button, Container, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import HeroBanner from '../../components/Row/RowHeroBanner'
import iconClip from '@graphcommerce/next-ui/icons/clip.svg'
import iconContact from '@graphcommerce/next-ui/icons/contact-book.svg'
import iconCut from '@graphcommerce/next-ui/icons/cut.svg'
import iconExtension from '@graphcommerce/next-ui/icons/extension.svg'
import iconFlower from '@graphcommerce/next-ui/icons/flower.svg'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & CmsPageQuery & ProductListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const randomRadius = () => {
  const min = 20
  const max = 80
  const rad1 = Math.floor(Math.random() * (max - min + 1) + min)
  const rad2 = Math.floor(Math.random() * (max - min + 1) + min)
  const rad3 = Math.floor(Math.random() * (max - min + 1) + min)
  const rad4 = Math.floor(Math.random() * (max - min + 1) + min)
  return `${rad1}% ${100 - rad1}% ${rad2}% ${100 - rad2}% / ${rad3}% ${rad4}% ${100 - rad4}% ${
    100 - rad3
  }%`
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      margin: `0 0 ${theme.spacings.xl} 0`,
      textAlign: 'center',
    },

    contained: {
      boxShadow: 'none',
      padding: responsiveVal(12, 26),
      margin: `${theme.spacings.xs}`,
      backgroundColor: theme.palette.secondary.light,
      '& svg': {
        width: responsiveVal(50, 120),
        height: responsiveVal(50, 120),
        strokeWidth: 0.5,
      },
    },
  }),
  { name: 'Footer' },
)

function CmsPage(props: Props) {
  const { cmsPage, pages, products } = props
  const title = cmsPage?.title ?? ''

  const product = products?.items?.[0]
  const page = pages?.[0]
  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  const classes = useStyles(props)
  const theme = useTheme()

  return (
    <>
      <PageMeta
        title={page?.metaTitle ?? cmsPage?.meta_title ?? title ?? ''}
        metaDescription={page?.metaDescription ?? cmsPage?.meta_description ?? ''}
        metaRobots={metaRobots}
        canonical={page?.url}
      />
      {pages?.[0] ? (
        <RowRenderer
          content={pages?.[0].content}
          renderer={{
            RowHeroBanner: (rowProps) => {
              return (
                <div>
                  <HeroBanner {...rowProps} />

                  <Container className={classes.container} maxWidth={false}>
                    <Button
                      size='large'
                      variant='contained'
                      color='secondary'
                      style={{ borderRadius: randomRadius() }}
                      className={classes.contained}
                    >
                      <SvgImageSimple src={iconClip} size='xxl' />
                    </Button>
                    <Button
                      size='large'
                      variant='contained'
                      color='secondary'
                      style={{ borderRadius: randomRadius() }}
                      className={classes.contained}
                    >
                      <SvgImageSimple src={iconExtension} size='xxl' />
                    </Button>
                    <Button
                      size='large'
                      variant='contained'
                      color='secondary'
                      style={{ borderRadius: randomRadius() }}
                      className={classes.contained}
                    >
                      <SvgImageSimple src={iconContact} size='xxl' />
                    </Button>
                    <Button
                      size='large'
                      variant='contained'
                      color='secondary'
                      style={{ borderRadius: randomRadius() }}
                      className={classes.contained}
                    >
                      <SvgImageSimple src={iconFlower} size='xxl' />
                    </Button>
                    <Button
                      size='large'
                      variant='contained'
                      color='secondary'
                      style={{ borderRadius: randomRadius() }}
                      className={classes.contained}
                    >
                      <SvgImageSimple src={iconCut} size='xxl' />
                    </Button>
                  </Container>
                </div>
              )
            },
            RowProduct: (rowProps) => (
              <RowProduct {...rowProps} {...product} items={products?.items} />
            ),
          }}
        />
      ) : (
        <CmsPageContent {...cmsPage} />
      )}
    </>
  )
}

CmsPage.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['home', 'no-route']

  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: CmsPageDocument,
    variables: {
      url: `page/${urlKey}`,
      urlKey,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const categoryUid = String((await conf).data.storeConfig?.root_category_uid ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { categoryUid, pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  return {
    props: {
      alwaysShowLogo: true,
      ...(await page).data,
      ...(await productList).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
