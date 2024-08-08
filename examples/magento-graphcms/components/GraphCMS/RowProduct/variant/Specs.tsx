import { ProductSpecs } from '@graphcommerce/magento-product'
import type { RowProductPageProps } from '../RowProductPage'

type SpecsProps = Omit<RowProductPageProps, 'productPageVariant'>

export function Specs(props: SpecsProps) {
  const { title, product } = props
  if (!product) return null
  return <ProductSpecs title={title} product={product} />
}
