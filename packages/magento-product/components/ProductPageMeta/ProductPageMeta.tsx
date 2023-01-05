import { PageMeta } from '@graphcommerce/magento-store'
import { ProductPageMetaFragment } from './ProductPageMeta.gql'

export function ProductPageMeta(props: ProductPageMetaFragment) {
  const { name, meta_title, meta_description, url_key } = props

  return (
    <PageMeta
      title={meta_title ?? name ?? ''}
      metaDescription={meta_description ?? name ?? ''}
      canonical={`/p/${url_key}`}
    />
  )
}
