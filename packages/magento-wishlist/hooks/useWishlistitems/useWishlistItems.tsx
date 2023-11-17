import { QueryResult, useApolloClient, useQuery } from '@graphcommerce/graphql'
import {
  useCustomerQuery,
  useCustomerSession,
  useGuestQuery,
} from '@graphcommerce/magento-customer'
import type { Get } from 'type-fest'
import { useWishlistEnabled } from '../useWishlistEnabled/useWishlistEnabled'
import {
  UseWishlistCustomerDocument,
  UseWishlistCustomerQuery,
  UseWishlistCustomerQueryVariables,
} from './UseWishlistCustomer.gql'
import {
  UseWishlistGuestDocument,
  UseWishlistGuestQuery,
  UseWishlistGuestQueryVariables,
} from './UseWishlistGuest.gql'
import { WishlistItemFragment } from '../../queries/WishlistItem.gql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export type UseWishlistItemsGuestReturn = {
  enabled: boolean
  loggedIn: false
  items: WishlistItemFragment[]
} & QueryResult<UseWishlistGuestQuery, UseWishlistGuestQueryVariables>

export type UseWishlistItemsCustomerReturn = {
  enabled: boolean
  loggedIn: true
  items: WishlistItemFragment[]
} & QueryResult<UseWishlistCustomerQuery, UseWishlistCustomerQueryVariables>

export type UseWishlistItemsReturn = UseWishlistItemsGuestReturn | UseWishlistItemsCustomerReturn

export function useWishlistItems(): UseWishlistItemsReturn {
  const { loggedIn } = useCustomerSession()
  const enabled = useWishlistEnabled()

  /** Get customer wishlist from session */
  const wishlistCustomer = useCustomerQuery(UseWishlistCustomerDocument, { skip: !enabled })
  /** Get guest wishlist items from cache */
  const wishlistGuest = useGuestQuery(UseWishlistGuestDocument, { skip: !enabled })

  if (loggedIn) {
    const items = filterNonNullableKeys(
      (wishlistCustomer.data ?? wishlistCustomer.previousData)?.customer?.wishlists?.[0]?.items_v2
        ?.items,
      ['product'],
    )

    return { ...wishlistCustomer, enabled, loggedIn: true, items }
  }

  const items = filterNonNullableKeys(
    (wishlistGuest.data ?? wishlistGuest.previousData)?.customer?.wishlists?.[0]?.items_v2?.items,
    ['product'],
  )

  return { ...wishlistGuest, enabled, loggedIn: false, items }
}
