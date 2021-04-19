import { Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import Images from '@reachdigital/next-ui/FramerSlider/test/Images'
import Multi from '@reachdigital/next-ui/FramerSlider/test/Multi'
import Single from '@reachdigital/next-ui/FramerSlider/test/Single'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { m } from 'framer-motion'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import apolloClient from '../../lib/apolloClient'

type Props = ProductListQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function TestSlider({ products }: Props) {
  const images = products?.items?.map((item) => item?.small_image?.url ?? '') ?? []
  return (
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
  )
}

TestSlider.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
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
