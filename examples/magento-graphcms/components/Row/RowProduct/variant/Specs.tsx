import { ProductSpecs, ProductSpecsProps } from '@graphcommerce/magento-product'
import React from 'react'
import { RowProductFragment } from '../RowProduct.gql'

type SpecsProps = RowProductFragment & ProductSpecsProps

export default function Specs(props: SpecsProps) {
  const { title, aggregations } = props

  if (!aggregations) return null

  return <ProductSpecs title={title} aggregations={aggregations} />
}
