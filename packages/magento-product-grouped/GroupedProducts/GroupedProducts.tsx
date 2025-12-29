import { ActionCardLayout, filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import type { GroupedProductFragment } from '../graphql/fragments/GroupedProduct.gql'
import { GroupedProductActionCard } from './GroupedProductActionCard'

export type GroupedProductsProps = {
  product: GroupedProductFragment
}

export function GroupedProducts(props: GroupedProductsProps) {
  const { product } = props

  const items = filterNonNullableKeys(product.items, ['position', 'product']).sort(
    (a, b) => a.position - b.position,
  )

  return (
    <ActionCardLayout>
      {items.map((item, index) => (
        <GroupedProductActionCard index={index} item={item} key={item.position} size='medium' />
      ))}
    </ActionCardLayout>
  )
}
