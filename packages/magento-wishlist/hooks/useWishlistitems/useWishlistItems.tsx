import type { useQuery } from '@graphcommerce/graphql'
import {
  useCustomerQuery,
  useCustomerSession,
  useGuestQuery,
} from '@graphcommerce/magento-customer'
import { nonNullable } from '@graphcommerce/next-ui'
import type { WishlistItemFragment } from '../../queries/WishlistItem.gql'
import { useWishlistEnabled } from '../useWishlistEnabled/useWishlistEnabled'
import type {
  UseWishlistCustomerQuery,
  UseWishlistCustomerQueryVariables,
} from './UseWishlistCustomer.gql'
import { UseWishlistCustomerDocument } from './UseWishlistCustomer.gql'
import type { UseWishlistGuestQuery, UseWishlistGuestQueryVariables } from './UseWishlistGuest.gql'
import { UseWishlistGuestDocument } from './UseWishlistGuest.gql'

export type UseWishlistItemsGuestReturn = {
  enabled: boolean
  loggedIn: false
  items: WishlistItemFragment[]
} & useQuery.Result<UseWishlistGuestQuery, UseWishlistGuestQueryVariables>

export type UseWishlistItemsCustomerReturn = {
  enabled: boolean
  loggedIn: true
  items: WishlistItemFragment[]
} & useQuery.Result<UseWishlistCustomerQuery, UseWishlistCustomerQueryVariables>

export type UseWishlistItemsReturn = UseWishlistItemsGuestReturn | UseWishlistItemsCustomerReturn

export function useWishlistItems(): UseWishlistItemsReturn {
  const { loggedIn } = useCustomerSession()
  const enabled = useWishlistEnabled()

  /** Get customer wishlist from session */
  const wishlistCustomer = useCustomerQuery(UseWishlistCustomerDocument, { skip: !enabled })
  /** Get guest wishlist items from cache */
  const wishlistGuest = useGuestQuery(UseWishlistGuestDocument, { skip: !enabled })

  if (loggedIn) {
    const items = (
      (wishlistCustomer.data ?? wishlistCustomer.previousData)?.customer?.wishlists?.[0]?.items_v2
        ?.items ?? []
    ).filter(nonNullable)

    return { ...wishlistCustomer, enabled, loggedIn: true, items }
  }

  const items = (
    (wishlistGuest.data ?? wishlistGuest.previousData)?.customer?.wishlists?.[0]?.items_v2?.items ??
    []
  ).filter(nonNullable)

  return { ...wishlistGuest, enabled, loggedIn: false, items }
}
