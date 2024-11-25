import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  InContextMaskProvider,
  cacheFirst,
  mergeDeep,
  useInContextQuery,
} from '@graphcommerce/graphql'
import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import {
  AddProductsToCartButton,
  AddProductsToCartForm,
  ProductPageAddToCartActionsRow,
  ProductPageBreadcrumbs,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageJsonLd,
  ProductPageMeta,
  ProductPageName,
  ProductShortDescription,
  ProductSpecs,
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  productPageCategory,
} from '@graphcommerce/magento-product'
import { defaultConfigurableOptionsSelection } from '@graphcommerce/magento-product-configurable'
import { RecentlyViewedProducts } from '@graphcommerce/magento-recently-viewed-products'
import { ProductReviewChip, jsonLdProductReview } from '@graphcommerce/magento-review'
import { Money, StoreConfigDocument, redirectOrNotFound } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutHeader, LayoutTitle, isTypename } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Typography } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../../components'
import { AddProductsToCartView } from '../../components/ProductView/AddProductsToCartView'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { ProductPage2Document } from '../../graphql/ProductPage2.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export type Props = ProductPage2Query &
  Pick<AddProductsToCartFormProps, 'defaultValues'> & { urlKey: string }

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductPage(props: Props) {
  const { defaultValues, urlKey } = props

  const scopedQuery = useInContextQuery(
    ProductPage2Document,
    { variables: { urlKey, useCustomAttributes: import.meta.graphCommerce.magentoVersion >= 247 } },
    props,
  )
  const { products, relatedUpsells } = scopedQuery.data

  const product = mergeDeep(
    products?.items?.[0],
    relatedUpsells?.items?.find((item) => item?.uid === products?.items?.[0]?.uid),
  )

  if (!product?.sku || !product.url_key) return null

  return (
    <InContextMaskProvider mask={scopedQuery.mask}>
      <AddProductsToCartForm key={product.uid} defaultValues={defaultValues}>
        <LayoutHeader floatingMd hideMd={import.meta.graphCommerce.breadcrumbs}>
          <LayoutTitle size='small' component='span'>
            <ProductPageName product={product} />
          </LayoutTitle>
        </LayoutHeader>

        <ProductPageJsonLd
          product={product}
          render={(p) => ({
            '@context': 'https://schema.org',
            ...jsonLdProduct(p),
            ...jsonLdProductOffer(p),
            ...jsonLdProductReview(p),
          })}
        />

        <ProductPageMeta product={product} />

        {import.meta.graphCommerce.breadcrumbs && (
          <ProductPageBreadcrumbs
            product={product}
            sx={(theme) => ({
              py: `calc(${theme.spacings.xxs} / 2)`,
              pl: theme.page.horizontal,
              background: theme.palette.background.paper,
              [theme.breakpoints.down('md')]: {
                '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
              },
            })}
          />
        )}

        <ProductPageGallery
          product={product}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
          })}
          disableSticky
        >
          <div>
            {isTypename(product, ['ConfigurableProduct', 'BundleProduct']) && (
              <Typography component='div' variant='body1' color='text.disabled'>
                <Trans
                  id='As low as <0/>'
                  components={{ 0: <Money {...product.price_range.minimum_price.final_price} /> }}
                />
              </Typography>
            )}
            <Typography variant='h3' component='div' gutterBottom>
              <ProductPageName product={product} />
            </Typography>
            <ProductShortDescription
              sx={(theme) => ({ mb: theme.spacings.xs })}
              product={product}
            />
            <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          </div>

          <AddProductsToCartView product={product} />

          <ProductPageAddToCartActionsRow product={product}>
            <AddProductsToCartButton fullWidth product={product} />
            <ProductWishlistChipDetail {...product} />
          </ProductPageAddToCartActionsRow>
        </ProductPageGallery>

        <ProductPageDescription product={product} fontSize='responsive' right='' />
      </AddProductsToCartForm>

      <ProductSpecs title='Specs' {...products} />

      <Reviews title='Reviews' {...product} />

      {product.related_products && product.related_products.length > 0 && (
        <ProductScroller
          title='Looking Similar'
          items={product.related_products.filter(nonNullable)}
          productListRenderer={productListRenderer}
          sizes={responsiveVal(200, 400)}
          itemScrollerProps={{
            sx: (theme) => ({
              mb: theme.spacings.xxl,
              '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
            }),
          }}
        />
      )}

      {product.upsell_products && product.upsell_products.length > 0 && (
        <ProductScroller
          title='You may also like'
          items={product.upsell_products.filter(nonNullable)}
          productListRenderer={productListRenderer}
          sizes={responsiveVal(200, 400)}
          itemScrollerProps={{
            sx: (theme) => ({
              mb: theme.spacings.xxl,
              '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
            }),
          }}
        />
      )}

      <RecentlyViewedProducts
        title={<Trans id='Recently viewed products' />}
        exclude={[product.sku]}
        productListRenderer={productListRenderer}
        sizes={responsiveVal(200, 400)}
        itemScrollerProps={{
          sx: (theme) => ({
            mb: theme.spacings.xxl,
            '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
          }),
        }}
        sx={(theme) => ({ mb: theme.spacings.xxl })}
      />
    </InContextMaskProvider>
  )
}

ProductPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getProductStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPage2Document,
    variables: { urlKey, useCustomAttributes: import.meta.graphCommerce.magentoVersion >= 247 },
  })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const product = productPage.then((pp) =>
    pp.data.products?.items?.find((p) => p?.url_key === urlKey),
  )

  if (!(await product)) return redirectOrNotFound(staticClient, conf, params, locale)

  const category = productPageCategory(await product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: '/', title: i18n._(/* i18n */ 'Home') }

  return {
    props: {
      urlKey,
      ...defaultConfigurableOptionsSelection(urlKey, client, (await productPage).data),
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
