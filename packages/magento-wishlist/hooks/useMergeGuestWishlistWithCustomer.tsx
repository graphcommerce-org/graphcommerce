import { useApolloClient } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { useAddProductsToWishlist } from './useAddProductsToWishlist/useAddProductsToWishlist'
import { UseWishlistCustomerDocument } from './useWishlistitems/UseWishlistCustomer.gql'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const { loggedIn } = useCustomerSession()
  const client = useApolloClient()

  const add = useAddProductsToWishlist()

  useEffect(() => {
    if (!loggedIn) return

    const clearGuestList = () => client.cache.evict({ fieldName: 'customer' })
    const wishlist = client.cache.readQuery({ query: UseWishlistCustomerDocument })?.customer
      ?.wishlists?.[0]?.items_v2?.items
    if (!wishlist) return

    if (wishlist?.length === 0) {
      clearGuestList()
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    add(
      wishlist
        ?.map((item) => {
          if (!item?.product?.sku) return null
          return {
            sku: item.product.sku,
            quantity: 1,
            selected_options:
              item.__typename === 'ConfigurableWishlistItem'
                ? filterNonNullableKeys(item.configurable_options).map(
                    (option) => option.configurable_product_option_value_uid,
                  )
                : [],
          }
        })
        .filter(nonNullable),
    ).then(clearGuestList)
  }, [add, client, loggedIn])
}
