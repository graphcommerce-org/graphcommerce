import ProductListItem, {
  ProductListItemProps,
} from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemGiftCard(props: ProductListItemProps) {
  return (
    <ProductListItem {...props} subTitle={<Subtitle value='By Soxbase' />} aspectRatio={[1, 1]} />
  )
}
