import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  productPageCategory,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import {
  ConfigurableContextProvider,
  ConfigurableProductAddToCart,
  ConfigurableProductPageDocument,
  ConfigurableProductPageQuery,
} from '@graphcommerce/magento-product-configurable'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetailConfigurable } from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  JsonLd,
  LayoutHeader,
  LayoutTitle,
  SchemaDts,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Link, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { LayoutFull, LayoutFullProps, RowProduct, RowRenderer, Usps } from '../../../components'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & ConfigurableProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function ProductConfigurable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  const router = useRouter()

  if (
    product?.__typename !== 'ConfigurableProduct' ||
    typeProduct?.__typename !== 'ConfigurableProduct' ||
    !product.sku
  )
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
      <ConfigurableContextProvider {...typeProduct} sku={product.sku}>
        <ProductPageMeta {...product} />

        <ProductPageGallery {...product}>
          <div>
            <Typography component='span' variant='body2' color='text.disabled'>
              <Trans
                id='As low as <0/>'
                components={{ 0: <Money {...product.price_range.minimum_price.final_price} /> }}
              />
            </Typography>
          </div>
          <Typography variant='h3' component='div' gutterBottom>
            {product.name}
          </Typography>

          <ProductShortDescription short_description={product?.short_description} />

          <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          <ConfigurableProductAddToCart
            variables={{ sku: product.sku ?? '', quantity: 1 }}
            name={product.name ?? ''}
            optionEndLabels={{
              size: (
                <Link
                  component='button'
                  color='primary'
                  underline='hover'
                  onClick={(e) => {
                    e.preventDefault()
                    return router.push('/modal/product/global/size')
                  }}
                >
                  <Trans id='Which size is right?' />
                </Link>
              ),
            }}
            additionalButtons={<ProductWishlistChipDetailConfigurable {...product} />}
          >
            <ProductSidebarDelivery />
          </ConfigurableProductAddToCart>
          <Usps usps={sidebarUsps} size='small' />
        </ProductPageGallery>

        <ProductPageDescription {...product} right={<Usps usps={usps} />} fontSize='responsive' />

        {pages?.[0] && (
          <RowRenderer
            content={pages?.[0].content}
            renderer={{
              RowProduct: (rowProps) => (
                <RowProduct
                  {...rowProps}
                  {...product}
                  items={products?.items}
                  aggregations={aggregations}
                />
              ),
            }}
          />
        )}
      </ConfigurableContextProvider>
    </>
  )
}

ProductConfigurable.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default ProductConfigurable

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'ConfigurableProduct')
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
    query: ConfigurableProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'ConfigurableProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'ConfigurableProduct'
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
