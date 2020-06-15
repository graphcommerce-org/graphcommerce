import React from 'react'
import Money from '../Money'

export default function ProductPrice({ final_price }: GQLProductPriceFragment) {
  return <Money {...final_price} />
}
