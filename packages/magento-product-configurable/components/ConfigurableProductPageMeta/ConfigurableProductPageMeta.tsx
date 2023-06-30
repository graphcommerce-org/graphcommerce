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

  return (
    <PageMeta
      title={simpleProduct?.meta_title ?? simpleProduct?.name ?? meta_title ?? name ?? ''}
      metaDescription={
        simpleProduct?.meta_description ?? simpleProduct?.name ?? meta_description ?? name ?? ''
      }
      canonical={simpleProductLink ?? productLink}
      ogImage={simpleProduct?.media_gallery?.[0]?.url ?? media_gallery?.[0]?.url}
      ogType='product'
      {...ProductPageProps}
    >
      {simpleProduct?.sku ? (
        <meta
          property='product:retailer_part_no'
          content={simpleProduct?.sku}
          key='og-product-sku'
        />
      ) : (
        sku && <meta property='product:retailer_part_no' content={sku} key='og-product-sku' />
      )}

      {simpleProduct?.price_range?.minimum_price?.regular_price?.value ? (
        <meta
          property='product:price:amount'
          content={simpleProduct?.price_range.minimum_price.regular_price.value.toString()}
          key='og-product-price'
        />
      ) : (
        price_range?.minimum_price?.regular_price?.value && (
          <meta
            property='product:price:amount'
            content={price_range.minimum_price.regular_price.value.toString()}
            key='og-product-price'
          />
        )
      )}

      {simpleProduct?.price_range?.minimum_price?.final_price?.value ? (
        <meta
          property='product:sale_price:amount'
          content={simpleProduct?.price_range.minimum_price.final_price.value.toString()}
          key='og-product-sale-price'
        />
      ) : (
        price_range?.minimum_price?.final_price?.value && (
          <meta
            property='product:sale_price:amount'
            content={price_range.minimum_price.final_price.value.toString()}
            key='og-product-sale-price'
          />
        )
      )}

      {simpleProduct?.price_range?.minimum_price?.final_price?.currency ? (
        <meta
          property='product:price:currency'
          content={simpleProduct?.price_range.minimum_price.final_price.currency}
          key='og-product-currency'
        />
      ) : (
        price_range?.minimum_price?.final_price?.currency && (
          <meta
            property='product:price:currency'
            content={price_range.minimum_price.final_price.currency}
            key='og-product-currency'
          />
        )
      )}

      {simpleProduct?.categories
        ? simpleProduct?.categories.map((category) =>
            category?.name ? (
              <meta property='product:category' content={category.name} key={category.uid} />
            ) : null,
          )
        : categories &&
          categories.map((category) =>
            category?.name ? (
              <meta property='product:category' content={category.name} key={category.uid} />
            ) : null,
          )}
    </PageMeta>
  )
}
