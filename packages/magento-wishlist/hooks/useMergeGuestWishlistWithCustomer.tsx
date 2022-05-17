import { useMutation, useQuery, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useCallback, useEffect, useMemo } from 'react'
import { AddProductToWishlistDocument } from '../queries/AddProductToWishlist.gql'
import { GetGuestWishlistProductsDocument } from '../queries/GetGuestWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

function useValidatedItems(guestDataSkus: string[]) {
  const guestWishList = useQuery(GetGuestWishlistProductsDocument, {
    ssr: false,
    variables: {
      filters: { sku: { in: guestDataSkus } },
    },
    skip: guestDataSkus.length === 0,
  })
  const items = useMemo(
    () => guestWishList.data?.products?.items?.map((item) => item?.sku) || [],
    [guestWishList.data?.products?.items],
  )
  return items
}

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const customerToken = useQuery(CustomerTokenDocument)?.data?.customerToken
  const isLoggedIn = customerToken?.token && customerToken?.valid
  const { cache } = useApolloClient()

  const guestWishlistData = useQuery(GuestWishlistDocument, {
    ssr: false,
  }).data?.guestWishlist

  const guestDataSkus = useMemo(
    () => guestWishlistData?.items.map((item) => item?.sku) || [],
    [guestWishlistData?.items],
  )

  const validatedItems = useValidatedItems(guestDataSkus)

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  const addWishlist = useCallback(
    (
      payload: {
        sku: string
        selected_options: (string | null)[] | null | undefined
        quantity: number
      }[],
    ) =>
      addWishlistItem({ variables: { input: payload } }).then(() =>
        cache.evict({
          id: cache.identify({ __typename: 'GuestWishlist' }),
        }),
      ),
    [addWishlistItem, cache],
  )

  const purgeOutdatedItems = useCallback(() => {
    /** Only outdated items were found, purge them */
    cache.evict({
      id: cache.identify({ __typename: 'GuestWishlist' }),
    })
  }, [cache])

  useEffect(() => {
    if (!isLoggedIn) return

    if (!guestDataSkus.length) return

    if (!validatedItems.length) {
      purgeOutdatedItems()
      return
    }

    const wishlist =
      guestWishlistData?.items.filter((item) => validatedItems.includes(item.sku)) || []

    if (!wishlist.length) return

    const payload = wishlist.map((item) => ({
      sku: item.sku,
      selected_options: item.selected_options,
      quantity: item.quantity,
    }))

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    addWishlist(payload)
  }, [
    isLoggedIn,
    validatedItems,
    guestDataSkus,
    addWishlist,
    guestWishlistData?.items,
    purgeOutdatedItems,
  ])
}
