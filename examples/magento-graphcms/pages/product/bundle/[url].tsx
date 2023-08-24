import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  productPageCategory,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductSidebarDelivery,
  ProductAddToCart,
} from '@graphcommerce/magento-product'
import {
  BundleItemsForm,
  BundleProductPageDocument,
  BundleProductPageQuery,
} from '@graphcommerce/magento-product-bundle'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import {
  findByTypename,
  GetStaticProps,
  JsonLd,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../../components'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & BundleProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductBundle(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

  const product = findByTypename(products?.items, 'BundleProduct')
  const typeProduct = findByTypename(typeProducts?.items, 'BundleProduct')
  const aggregations = products?.aggregations

  if (!product?.sku || !product.url_key || !typeProduct) return null

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {product.name}
        </LayoutTitle>
      </LayoutHeader>
      <JsonLd
        item={{
          '@context': 'https://schema.org',
          ...jsonLdProduct(product),
          ...jsonLdProductOffer(product),
          ...jsonLdProductReview(product),
        }}
      />

      <ProductPageMeta product={product} />
      <ProductPageGallery product={product}>
        <Typography variant='h3' component='div'>
          {product.name}
        </Typography>
        <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
        <ProductAddToCart
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
          price={product.price_range.minimum_price.final_price}
          additionalButtons={<ProductWishlistChipDetail {...product} />}
        >
          <ProductSidebarDelivery />
        </ProductAddToCart>
        <BundleItemsForm {...typeProduct} />
        <Usps usps={sidebarUsps} size='small' />
      </ProductPageGallery>

      <ProductPageDescription
        product={product}
        right={<Usps usps={usps} />}
        fontSize='responsive'
      />

      {pages?.[0] && (
        <RowRenderer
          content={pages?.[0].content}
          renderer={{
            RowProduct: (rowProps) => (
              <RowProduct {...rowProps} {...product} aggregations={aggregations} />
            ),
          }}
        />
      )}
    </>
  )
}

ProductBundle.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductBundle

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (!import.meta.graphCommerce.legacyProductRoute) return { paths: [], fallback: false }
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'BundleProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { url: 'product/global', urlKey },
  })
  const typeProductPage = staticClient.query({
    query: BundleProductPageDocument,
    variables: { urlKey },
  })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const product = findByTypename((await productPage).data.products?.items, 'BundleProduct')
  const typeProduct = findByTypename(
    (await typeProductPage).data.typeProducts?.items,
    'BundleProduct',
  )
  if (!product || !typeProduct) return { notFound: true }

  const category = productPageCategory((await productPage).data?.products?.items?.[0])
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
