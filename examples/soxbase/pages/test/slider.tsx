import { Container, Typography } from '@material-ui/core'
import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import Images from '@reachdigital/next-ui/FramerSlider/test/Images'
import Multi from '@reachdigital/next-ui/FramerSlider/test/Multi'
import Single from '@reachdigital/next-ui/FramerSlider/test/Single'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { m } from 'framer-motion'
import React from 'react'
import Footer from '../../components/Footer'
import { FooterDocument, FooterQuery } from '../../components/Footer/Footer.gql'
import HeaderActions from '../../components/HeaderActions/HeaderActions'
import Logo from '../../components/Logo/Logo'
import apolloClient from '../../lib/apolloClient'

type Props = FooterQuery & PageLayoutQuery & ResolveUrlQuery & ProductListQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props>

function TestSlider({ menu, urlResolver, footer, products }: Props) {
  const images = products?.items?.map((item) => item?.small_image?.url ?? '') ?? []
  return (
    <FullPageUi
      title='slider'
      menu={<MenuTabs menu={menu} urlResolver={urlResolver} />}
      logo={<Logo />}
      actions={<HeaderActions />}
    >
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

        <Footer footer={footer} />
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
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const footer = staticClient.query({ query: FooterDocument })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const cat = String((await config).data.storeConfig?.root_category_id ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { rootCategory: cat, pageSize: 8, filters: { category_id: { eq: '5' } } },
  })

  await config
  return {
    props: {
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await productList).data,
      apolloState: client.cache.extract(),
    },
  }
}

export default TestSlider
