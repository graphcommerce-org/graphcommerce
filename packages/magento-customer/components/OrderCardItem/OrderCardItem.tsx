import type { ProductImage } from '@graphcommerce/graphql-mesh'
import { OrderCardItemImage } from '../OrderCardItemImage/OrderCardItemImage'
import type { OrderCardItemFragment } from './OrderCardItem.gql'

export type OrderCardItemProps = OrderCardItemFragment & {
  thumbnail?: Pick<ProductImage, 'label' | 'url'>
}

export function OrderCardItem(props: OrderCardItemProps) {
  const { product_sku, product_url_key, thumbnail } = props

  return (
    <div key={`orderCardItem-${product_sku ?? ''}`}>
      <OrderCardItemImage thumbnail={thumbnail} url_key={product_url_key ?? ''} />
    </div>
  )
}
