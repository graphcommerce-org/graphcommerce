import { Container, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import SliderImage from '@reachdigital/next-ui/FramerSlider/SliderImage'
import Images from '@reachdigital/next-ui/FramerSlider/test/Images'
import Multi from '@reachdigital/next-ui/FramerSlider/test/Multi'
import Single from '@reachdigital/next-ui/FramerSlider/test/Single'
import SidebarGallery from '@reachdigital/next-ui/FramerSlider/variants/SidebarGallery'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
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
            Expandable Image Gallery with sidebar
          </Typography>
        </m.div>
        <SidebarGallery
          sidebar={
            <>
              <h1>Title</h1>
              <ul>
                <li>Some product details</li>
                <li>Or other information</li>
                <li>Can be displayed here</li>
              </ul>
            </>
          }
        >
          {images.map((image) => (
            <SliderImage key={image} width={1532} height={1678}>
              <PictureResponsiveNext
                src={image}
                type='image/jpeg'
                width={1532}
                height={1678}
                alt='img'
              />
            </SliderImage>
          ))}
        </SidebarGallery>

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
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const categoryUid = String((await conf).data.storeConfig?.root_category_uid ?? '')
  const productList = staticClient.query({
    query: ProductListDocument,
    variables: { categoryUid, pageSize: 8, filters: { category_uid: { eq: 'NQ==' } } },
  })

  return {
    props: {
      ...(await productList).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}

export default TestSlider
