import { GQLProductListPriceFragment } from 'generated/graphql'
import React from 'react'
import Money from '../Money'

export default function ProductListPrice({
  regular_price,
  final_price,
}: GQLProductListPriceFragment) {
  return (
    <>
      {regular_price.value !== final_price.value && <Money {...regular_price} />}
      <Money {...final_price} />
    </>
  )
}
