import React from 'react'
import Money from '../Money'

export default function ProductListPrice({ final_price }: GQLProductListPriceFragment) {
  return <Money {...final_price} />
}
