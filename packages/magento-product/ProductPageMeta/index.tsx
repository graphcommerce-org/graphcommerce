import { PageMeta } from '@reachdigital/magento-store'
import React from 'react'
import { useProductLink } from '../ProductLink'
import { ProductPageMetaFragment } from './ProductPageMeta.gql'

export default function ProductPageMeta(props: ProductPageMetaFragment) {
  const { name, meta_title, meta_description, url_key, __typename } = props
  const productLink = useProductLink({ url_key, __typename, canonical: false })

  return (
    <PageMeta
      title={meta_title ?? name ?? ''}
      metaDescription={meta_description ?? ''}
      // substr: skip the first slash
      urlPath={productLink.substr(1)}
    />
  )
}
