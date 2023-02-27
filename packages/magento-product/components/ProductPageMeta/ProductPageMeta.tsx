import { PageMeta } from '@graphcommerce/magento-store'
import { useProductLink } from '../../hooks/useProductLink'
import { ProductPageMetaFragment } from './ProductPageMeta.gql'

export function ProductPageMeta(props: ProductPageMetaFragment) {
  const { sku, categories, price_range, media_gallery, name, meta_title, meta_description, url_key, __typename } = props
  const productLink = useProductLink({ url_key, __typename })
  const categoryNames = categories?.map((category) => category?.name ?? '')

  return (
      <PageMeta
          title={meta_title ?? name ?? ''}
          metaDescription={meta_description ?? name ?? ''}
          canonical={productLink}
          sku={sku}
          name={name}
          image={media_gallery?.[0]?.url ?? null}
          categories={categoryNames}
          price={price_range?.maximum_price?.regular_price?.value ?? 0}
          salePrice={price_range?.maximum_price?.final_price?.value ?? 0}
      />
  )
}
