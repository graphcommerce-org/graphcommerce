import { ProductSpecs } from '@graphcommerce/magento-product'
import { ProductSpecsFragment } from '@graphcommerce/magento-product/components/ProductSpecs/ProductSpecs.gql'
import React from 'react'
import { RowProductFragment } from '../RowProduct.gql'

type SpecsProps = RowProductFragment & ProductSpecsFragment

export default function Specs(props: SpecsProps) {
  const { title, aggregations } = props

  if (!aggregations) return null

  return <ProductSpecs title={title} aggregations={aggregations} />
}
