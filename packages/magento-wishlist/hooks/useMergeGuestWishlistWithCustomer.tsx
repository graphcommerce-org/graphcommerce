import { useMutation, useQuery, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { AddProductToWishlistDocument } from '../queries/AddProductToWishlist.gql'
import { GetGuestWishlistProductsDocument } from '../queries/GetGuestWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const customerToken = useQuery(CustomerTokenDocument)?.data?.customerToken
  const isLoggedIn = customerToken?.token && customerToken?.valid
  const { cache } = useApolloClient()

  const guestSkus = useQuery(GuestWishlistDocument, { ssr: false }).data?.guestWishlist?.items

  const guestProducts = useQuery(GetGuestWishlistProductsDocument, {
    ssr: false,
    variables: { filters: { sku: { in: guestSkus?.map((item) => item?.sku) } } },
    skip: guestSkus && guestSkus?.length === 0,
  }).data?.products?.items

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!isLoggedIn || !guestSkus || guestSkus.length === 0) return

    const clear = () => cache.evict({ id: cache.identify({ __typename: 'GuestWishlist' }) })

    if (guestProducts?.length === 0) {
      clear()
      return
    }

    const input = guestSkus
      .filter((item) => guestProducts?.find((i) => i?.sku === item.sku))
      .map(({ sku, selected_options, quantity }) => ({ sku, selected_options, quantity }))

    if (!input.length) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    addWishlistItem({ variables: { input } }).then(clear)
  }, [addWishlistItem, cache, guestProducts, guestSkus, isLoggedIn])
}
