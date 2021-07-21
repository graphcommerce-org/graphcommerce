import { Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { Image } from '@reachdigital/image'
import { ProductListDocument, ProductListQuery } from '@reachdigital/magento-product'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import {
  SliderImage,
  Images,
  Multi,
  Single,
  SidebarGallery,
  GetStaticProps,
} from '@reachdigital/next-ui'
import { m } from 'framer-motion'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import apolloClient from '../../lib/apolloClient'

type Props = ProductListQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function TestSlider({ products }: Props) {
  const images = products?.items?.map((item) => item?.small_image?.url ?? '') ?? []
  return (
    <>
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
            Sidebar image gallery
          </Typography>
        </m.div>
      </Container>

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
            <Image src={image} width={1532} height={1678} alt='img' />
          </SliderImage>
        ))}
      </SidebarGallery>

      <Container>
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
    </>
  )
}

TestSlider.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions
export default TestSlider

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
