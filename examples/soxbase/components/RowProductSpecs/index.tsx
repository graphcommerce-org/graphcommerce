import { ProductSpecs, ProductSpecsProps } from '@reachdigital/magento-product'
import NextProductSpecs from '@reachdigital/next-ui/Row/NextProductSpecs'
import React from 'react'
import { RowProductSpecsFragment } from './RowProductSpecs.gql'

type RowProductSpecsProps = RowProductSpecsFragment & ProductSpecsProps

export default function RowProductSpecs(props: RowProductSpecsProps) {
  const { aggregations } = props

  if (!aggregations) {
    return null
  }

  return (
    <NextProductSpecs
      title='Product specifications'
      productSpecs={<ProductSpecs aggregations={aggregations} />}
    />
  )
}
