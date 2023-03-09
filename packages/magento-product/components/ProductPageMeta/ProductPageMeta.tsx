import { PageMeta } from '@graphcommerce/magento-store'
import { useCanonical } from '@graphcommerce/next-ui'
import { useProductLink } from '../../hooks/useProductLink'
import { ProductPageMetaFragment } from './ProductPageMeta.gql'

export function ProductPageMeta(props: ProductPageMetaFragment) {
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
  } = props
  const productLink = useProductLink({ url_key, __typename })
  const canonical = useCanonical(productLink)

  return (
    <PageMeta
      title={meta_title ?? name ?? ''}
      metaDescription={meta_description ?? name ?? ''}
      canonical={productLink}
    >
      {sku && (
        <>
          <meta property='type' content='product' key='og-type' />
          <meta property='product:retailer_part_no' content={sku} key='og-sku' />
        </>
      )}
      {name && <meta property='og:title' content={name} key='og-title' />}
      {media_gallery?.[0]?.url && (
        <meta property='og:image' content={media_gallery[0].url} key='og-image' />
      )}
      {price_range?.minimum_price?.regular_price?.value && (
        <meta
          property='product:price:amount'
          content={price_range.minimum_price.regular_price.value.toString()}
          key='og-price'
        />
      )}
      {price_range?.minimum_price?.final_price?.value && (
        <meta
          property='product:sale_price:amount'
          content={price_range.minimum_price.final_price.value.toString()}
          key='og-sale-price'
        />
      )}
      {price_range?.minimum_price?.final_price?.currency && (
        <meta
          property='product:price:currency'
          content={price_range.minimum_price.final_price.currency}
          key='og-currency'
        />
      )}
      {categories &&
        categories.map((category) =>
          category?.name ? (
            <meta property='product:category' content={category.name} key={category.uid} />
          ) : null,
        )}
      {canonical && <meta property='og:url' content={canonical} key='og-url' />}
    </PageMeta>
  )
}
