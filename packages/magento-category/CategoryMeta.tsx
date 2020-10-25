import PageMeta from '@reachdigital/magento-store/PageMeta'
import React from 'react'

export default function CategoryMeta(props: GQLCategoryMetaFragment) {
  const { name, meta_title, meta_description } = props

  return (
    <PageMeta
      title={meta_title ?? name ?? ''}
      metaDescription={meta_description ?? ''}
      metaRobots='INDEX, FOLLOW'
    />
  )
}
