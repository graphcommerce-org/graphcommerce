import { ProductImage } from '@graphcommerce/graphql'
import React from 'react'
import OrderCardItemImage from '../OrderCardItemImage'
import { OrderCardItemFragment } from './OrderCardItem.gql'

export type OrderCardItemProps = OrderCardItemFragment & {
  thumbnail?: Pick<ProductImage, 'label' | 'url'>
}

export default function OrderCardItem(props: OrderCardItemProps) {
  const { product_sku, product_url_key, thumbnail } = props

  return (
    <div key={`orderCardItem-${product_sku ?? ''}`}>
      <OrderCardItemImage thumbnail={thumbnail} url_key={product_url_key ?? ''} />
    </div>
  )
}
