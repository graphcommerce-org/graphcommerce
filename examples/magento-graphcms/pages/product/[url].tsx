import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCart,
  productPageCategory,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductSidebarDelivery,
  ProductWeight,
} from '@graphcommerce/magento-product'
import {
  SimpleProductPageDocument,
  SimpleProductPageQuery,
} from '@graphcommerce/magento-product-simple'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  JsonLd,
  SchemaDts,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutFull, LayoutFullProps, RowProduct, RowRenderer, Usps } from '../../components'
import { ProductPageDocument, ProductPageQuery } from '../../graphql/ProductPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = ProductPageQuery & SimpleProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function ProductSimple(props: Props) {
  const { products, usps, sidebarUsps, typeProducts, pages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (product?.__typename !== 'SimpleProduct' || typeProduct?.__typename !== 'SimpleProduct')
    return <div />

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {product.name}
        </LayoutTitle>
      </LayoutHeader>
      <JsonLd<SchemaDts.Product>
        item={{
          '@context': 'https://schema.org',
          ...jsonLdProduct(product),
          ...jsonLdProductOffer(product),
          ...jsonLdProductReview(product),
        }}
      />

      <ProductPageMeta {...product} />
      <ProductPageGallery {...product}>
        <Typography variant='h2' component='div'>
          {product.name}
        </Typography>

        <Typography
          variant='body1'
          component='div'
          dangerouslySetInnerHTML={{ __html: product?.short_description?.html ?? '' }}
        />

        <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
        <ProductAddToCart
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
          price={product.price_range.minimum_price.regular_price}
        >
          <ProductSidebarDelivery />
        </ProductAddToCart>
        <ProductWeight weight={typeProduct?.weight} />
        <Usps usps={sidebarUsps} size='small' />
      </ProductPageGallery>

      <ProductPageDescription {...product} right={<Usps usps={usps} />} fontSize='responsive' />

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

ProductSimple.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default ProductSimple

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'SimpleProduct')
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
    variables: {
      url: 'product/global',
      urlKey,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  const typeProductPage = staticClient.query({
    query: SimpleProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'SimpleProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'SimpleProduct'
  ) {
    return { notFound: true }
  }

  const category = productPageCategory((await productPage).data?.products?.items?.[0])

  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
