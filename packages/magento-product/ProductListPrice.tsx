import Money from '@reachdigital/magento-store/Money'
import React from 'react'
import { ProductListPriceFragment } from './ProductListPrice.graphql'

export default function ProductListPrice({ regular_price, final_price }: ProductListPriceFragment) {
  return (
    <>
      {regular_price.value !== final_price.value && <Money {...regular_price} />}
      <Money {...final_price} />
    </>
  )
}
