import { ProductSpecs } from '@graphcommerce/magento-product'
import type { RowProductVariantProps } from '../../RowProduct'

export function Specs(props: RowProductVariantProps) {
  const { blok, aggregations, specsItems } = props

  if (!aggregations && !specsItems) return null

  return <ProductSpecs title={blok.title} aggregations={aggregations} items={specsItems} />
}
