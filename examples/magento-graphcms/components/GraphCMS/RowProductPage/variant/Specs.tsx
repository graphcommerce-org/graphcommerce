import { ProductSpecs } from '@graphcommerce/magento-product'
import { RowProductPageFragment } from '../RowProductPage.gql'

type SpecsProps = RowProductPageFragment

export function Specs(props: SpecsProps) {
  const { title, product } = props
  if (!product) return null
  return <ProductSpecs title={title} product={product} />
}
