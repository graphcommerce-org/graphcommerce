import { ActionCardLayout, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import type { ProductPageGroupedQueryFragment } from '../ProductPageGroupedQueryFragment.gql'
import { GroupedProductActionCard } from './GroupedProductActionCard'

type GroupedProductsProps = {
  product: NonNullable<NonNullable<ProductPageGroupedQueryFragment['typeProducts']>['items']>[0]
}

export function GroupedProducts(props: GroupedProductsProps) {
  const { product } = props
  const productItems = useMemo(() => {
    if (product?.__typename !== 'GroupedProduct') return null
    const { items } = product
    return filterNonNullableKeys(items, ['product']).map((item, i) => ({
      ...item.product,
      value: item.product.sku ?? '',
      index: i,
    }))
  }, [product])
  if (!productItems) return null

  return (
    <ActionCardLayout>
      {productItems.map((item) => (
        <GroupedProductActionCard {...item} key={item.value ?? ''} size='medium' />
      ))}
    </ActionCardLayout>
  )
}
