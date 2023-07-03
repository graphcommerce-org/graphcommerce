import { ProductPageMetaFragment } from '@graphcommerce/magento-product/components/ProductPageMeta/ProductPageMeta.gql'
import { useProductLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import { PageMeta } from '@graphcommerce/magento-store'
import { PageMetaProps } from '@graphcommerce/next-ui'
import { useConfigurableOptionsSelection } from '../../hooks'

type ConfigurableProductPageMetaProps = ProductPageMetaFragment &
  Pick<PageMetaProps, 'children' | 'ogImage' | 'ogImageUseFallback'> & { index?: number }

export function ConfigurableProductPageMeta(props: ConfigurableProductPageMetaProps) {
  const {
    sku,
    categories,
    price_range,
    media_gallery,
    name,
    meta_title,
    meta_description,
    url_key,
    __typename,
    index = 0,
    ...ProductPageProps
  } = props

  const productLink = useProductLink({ url_key, __typename })
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const simpleProduct = configured?.configurable_product_options_selection?.variant
  const simpleProductLink = useProductLink({
    url_key: simpleProduct?.url_key,
    __typename: simpleProduct ? simpleProduct.__typename : __typename,
  })

  const getProductMetaTitle = (): string =>
    simpleProduct?.meta_title ?? simpleProduct?.name ?? meta_title ?? name ?? ''

  const getProductMetaDescription = (): string =>
    simpleProduct?.meta_description ?? simpleProduct?.name ?? meta_description ?? name ?? ''

  const getProductCanonical = (): string => simpleProductLink ?? productLink

  const getOgImage = (): string =>
    simpleProduct?.media_gallery?.[0]?.url ?? media_gallery?.[0]?.url ?? ''

  const getProductSku = (): string => simpleProduct?.sku || sku || ''

  const getProductRegularPrice = (): string =>
    simpleProduct?.price_range?.minimum_price?.regular_price?.value?.toString() ||
    price_range?.minimum_price?.regular_price?.value?.toString() ||
    ''

  const getProductSalePrice = (): string =>
    simpleProduct?.price_range?.minimum_price?.final_price?.value?.toString() ||
    price_range?.minimum_price?.final_price?.value?.toString() ||
    ''

  const getProductCurrency = (): string =>
    simpleProduct?.price_range?.minimum_price?.final_price?.currency ||
    price_range?.minimum_price?.final_price?.currency ||
    ''

  const getProductCategories = () => {
    const productCategories = simpleProduct?.categories || categories

    return productCategories?.map((category) => {
      if (category?.name) {
        return <meta property='product:category' content={category.name} key={category.uid} />
      }
      return null
    })
  }

  return (
    <PageMeta
      title={getProductMetaTitle()}
      metaDescription={getProductMetaDescription()}
      canonical={getProductCanonical()}
      ogImage={getOgImage()}
      ogType='product'
      {...ProductPageProps}
    >
      {getProductSku() && (
        <meta property='product:retailer_part_no' content={getProductSku()} key='og-product-sku' />
      )}

      {getProductRegularPrice() && (
        <meta
          property='product:price:amount'
          content={getProductRegularPrice()}
          key='og-product-price'
        />
      )}

      {getProductSalePrice() && (
        <meta
          property='product:sale_price:amount'
          content={getProductSalePrice()}
          key='og-product-sale-price'
        />
      )}

      {getProductCurrency() && (
        <meta
          property='product:price:currency'
          content={getProductCurrency()}
          key='og-product-currency'
        />
      )}

      {getProductCategories()}
    </PageMeta>
  )
}
