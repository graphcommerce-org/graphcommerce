import PageMeta from '@reachdigital/magento-store/PageMeta'
import React from 'react'
import { CategoryMetaFragment } from './CategoryMeta.gql'

export default function CategoryMeta(props: CategoryMetaFragment) {
  const { name, meta_title, meta_description } = props

  return <PageMeta title={meta_title ?? name ?? ''} metaDescription={meta_description ?? ''} />
}
