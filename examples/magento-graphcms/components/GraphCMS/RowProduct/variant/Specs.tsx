import { ProductSpecs } from '@graphcommerce/magento-product'
import { ProductSpecsFragment } from '@graphcommerce/magento-product/components/ProductSpecs/ProductSpecs.gql'
import { RowProductFragment } from '../RowProduct.gql'

type SpecsProps = RowProductFragment & ProductSpecsFragment

export function Specs(props: SpecsProps) {
  const { title, aggregations, items } = props

  if (!aggregations && !items) return null

  return <ProductSpecs title={title} aggregations={aggregations} items={items} />
}
