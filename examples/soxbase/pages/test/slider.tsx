import { Container, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import Images from '@reachdigital/next-ui/FramerSlider/test/Images'
import Multi from '@reachdigital/next-ui/FramerSlider/test/Multi'
import Single from '@reachdigital/next-ui/FramerSlider/test/Single'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { m } from 'framer-motion'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import apolloClient from '../../lib/apolloClient'

type Props = ProductListQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props>

function TestSlider({ products }: Props) {
  const images = products?.items?.map((item) => item?.small_image?.url ?? '') ?? []
  return (
    <FullPageUi title='slider' backFallbackTitle='Test' backFallbackHref='/test/index'>
      <Container>
        <Typography variant='h1' style={{ textAlign: 'center' }}>
          Framer Slider
        </Typography>

        <m.div layout>
          <Typography variant='h2' style={{ textAlign: 'center' }}>
            Expandable Image Gallery
          </Typography>
        </m.div>
        <Images urls={images} />

        <m.div layout>
          <Typography variant='h2' style={{ textAlign: 'center' }}>
            Multi item slider
          </Typography>
        </m.div>
        <Multi />

        <m.div layout>
          <Typography variant='h2' style={{ textAlign: 'center' }}>
            Single item Slider
          </Typography>
        </m.div>
        <Single />
      </Container>
    </FullPageUi>
  )
}

TestSlider.Layout = PageLayout

registerRouteUi('/test/slider', FullPageUi)

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const cat = String((await config).data.storeConfig?.root_category_uid ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { rootCategory: cat, pageSize: 8, filters: { category_uid: { eq: 'NQ==' } } },
  })

  return {
    props: {
      ...(await productList).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}

export default TestSlider
