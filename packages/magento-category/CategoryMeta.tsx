import { useQuery } from '@apollo/client'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import React from 'react'
import { CategoryMetaFragment } from './CategoryMeta.gql'

export default function CategoryMeta(props: CategoryMetaFragment) {
  const { name, meta_title, meta_description } = props
  const config = useQuery(StoreConfigDocument)

  return (
    <PageMeta
      title={meta_title ?? name ?? ''}
      metaDescription={meta_description ?? ''}
      url={config.data?.storeConfig?.base_link_url ?? ''}
    />
  )
}
