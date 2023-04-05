import { useMutation, useQuery, useApolloClient } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { AddProductToWishlistDocument } from '../queries/AddProductToWishlist.gql'
import { GetGuestWishlistProductsDocument } from '../queries/GetGuestWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const { loggedIn } = useCustomerSession()
  const { cache } = useApolloClient()

  const guestItems = useQuery(GuestWishlistDocument, { ssr: false }).data?.guestWishlist?.items

  const guestProducts = useQuery(GetGuestWishlistProductsDocument, {
    ssr: false,
    variables: { filters: { url_key: { in: guestItems?.map((item) => item?.url_key) } } },
    skip: !guestItems || guestItems.length === 0,
  }).data?.products?.items

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!loggedIn || !guestItems || guestItems.length === 0) return

    const clearGuestList = () =>
      cache.evict({ id: cache.identify({ __typename: 'GuestWishlist' }) })

    if (guestProducts?.length === 0) {
      clearGuestList()
    } else {
      const input = guestItems
        .filter((item) => guestProducts?.find((i) => i?.sku === item.sku))
        .map(({ sku, selected_options, quantity }) => ({ sku, selected_options, quantity }))

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      if (input.length) addWishlistItem({ variables: { input } }).then(clearGuestList)
    }
  }, [addWishlistItem, cache, guestProducts, guestItems, loggedIn])
}
