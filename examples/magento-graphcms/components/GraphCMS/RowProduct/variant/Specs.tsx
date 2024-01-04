import { ProductSpecs, ProductSpecsFragment } from '@graphcommerce/magento-product'
import { RowProductFragment } from '../RowProduct.gql'

type SpecsProps = RowProductFragment & ProductSpecsFragment

export function Specs(props: SpecsProps) {
  const { title, aggregations } = props

  if (!aggregations) return null

  return <ProductSpecs title={title} aggregations={aggregations} />
}
