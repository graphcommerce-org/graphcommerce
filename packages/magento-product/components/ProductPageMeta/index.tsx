import { PageMeta } from '@graphcommerce/magento-store'
import React from 'react'
import { useProductLink } from '../../hooks/useProductLink'
import { ProductPageMetaFragment } from './ProductPageMeta.gql'

export default function ProductPageMeta(props: ProductPageMetaFragment) {
  const { name, meta_title, meta_description, url_key, __typename } = props
  const productLink = useProductLink({ url_key, __typename })

  return (
    <PageMeta
      title={meta_title ?? name ?? ''}
      metaDescription={meta_description ?? name ?? ''}
      canonical={productLink}
    />
  )
}
