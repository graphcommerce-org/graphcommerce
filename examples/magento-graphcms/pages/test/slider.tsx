import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { LayoutTitle, LayoutHeader, SidebarGallery } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { InferGetStaticPropsType } from 'next'
import { LayoutNavigation } from '../../components'
import { getLayout } from '../../components/Layout/layout'

type Props = ProductListQuery

function TestSlider(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { products } = props
  if (!products?.items?.length) return null
  return (
    <>
      <LayoutHeader>
        <LayoutTitle size='small' component='span'>
          Product title
        </LayoutTitle>
      </LayoutHeader>

      <SidebarGallery
        sidebar={
          <>
            <LayoutTitle variant='h2' gutterTop={false}>
              Product Title
            </LayoutTitle>
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
            width: 1532,
            height: 1678,
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
  Layout: LayoutNavigation,
} as PageOptions
export default TestSlider

export const getStaticProps = enhanceStaticProps(getLayout, async () => {
  // todo(paales): Remove when https://github.com/Urigo/graphql-mesh/issues/1257 is resolved
  const productList = graphqlQuery(ProductListDocument, {
    variables: { pageSize: 8, filters: { category_uid: { eq: 'MTAy' } } },
  })

  return {
    props: {
      ...(await productList).data,
      up: { href: '/', title: 'Home' },
    },
  }
})
