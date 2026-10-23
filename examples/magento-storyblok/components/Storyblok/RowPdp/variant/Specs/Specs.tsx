import { ProductSpecs } from '@graphcommerce/magento-product'
import type { RowPdpVariantProps } from '../../RowPdp'

export function Specs(props: RowPdpVariantProps) {
  const { blok, aggregations, specsItems } = props

  if (!aggregations && !specsItems) return null

  return <ProductSpecs title={blok.title} aggregations={aggregations} items={specsItems} />
}
