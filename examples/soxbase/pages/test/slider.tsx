import { Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ProductListDocument, ProductListQuery } from '@reachdigital/magento-product'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui'
import useAppShellHeaderContext from '@reachdigital/next-ui/AppShell/AppShellHeader/useAppShellHeaderContext'
import SidebarGallery from '@reachdigital/next-ui/FramerScroller/components/SidebarGallery'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import apolloClient from '../../lib/apolloClient'

type Props = ProductListQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function TestSlider({ products }: Props) {
  const { titleRef } = useAppShellHeaderContext()
  return (
    <>
      {/* <FullPageShellHeader>
        <Title size='small'>Product title</Title>
      </FullPageShellHeader> */}
      {/* <Container>
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
    </Container> */}

      <SidebarGallery
        sidebar={
          <>
            <Typography variant='h2' component='h1' ref={titleRef}>
              Product Title
            </Typography>
            <ul>
              <li>Some product details</li>
              <li>Or other information</li>
              <li>Can be displayed here</li>
            </ul>
          </>
        }
        images={
          products?.items?.map((item) => ({
            src: item?.small_image?.url ?? '',
          })) ?? []
        }
      />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <Container>
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
    </Container> */}
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
    variables: { categoryUid, pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  return {
    props: {
      ...(await productList).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
