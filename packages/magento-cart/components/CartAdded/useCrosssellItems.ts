import { useQuery } from '@graphcommerce/graphql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useCartQuery } from '../../hooks'
import { CartAddedDocument } from './CartAdded.gql'
import { CrosssellsDocument } from './Crosssells.gql'

const crossSellsHideCartItems = Boolean(import.meta.graphCommerce.crossSellsHideCartItems)

export function useCrosssellItems() {
  const cartAdded = useCartQuery(CartAddedDocument)
  const items = filterNonNullableKeys(cartAdded.data?.cart?.items)
  const router = useRouter()

  const sku =
    router.query.sku ??
    cartAdded?.data?.cart?.items?.[cartAdded.data.cart.items.length - 1]?.product?.sku

  const addedItem = items.find((item) => item.product.sku === sku)

  const crosssels = useQuery(CrosssellsDocument, {
    variables: { pageSize: 1, filters: { sku: { eq: addedItem?.product.sku } } },
    skip: !addedItem?.product.sku,
  })

  const data =
    crosssels.data?.products?.items?.[0]?.crosssell_products ??
    crosssels.previousData?.products?.items?.[0]?.crosssell_products

  const crossSellItems = useMemo(
    () =>
      filterNonNullableKeys(data)
        .filter((item) => item.stock_status === 'IN_STOCK')
        .filter(
          (item) => !crossSellsHideCartItems || items.every((i) => i.product.sku !== item.sku),
        ),
    [data, items],
  )
  return [addedItem, crossSellItems] as const
}
