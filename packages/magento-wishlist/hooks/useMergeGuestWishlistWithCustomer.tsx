import { useMutation, useQuery } from '@apollo/client'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  GUEST_WISHLIST_STORAGE_NAME,
  AddProductToWishlistDocument,
} from '@graphcommerce/magento-wishlist'
import { useEffect } from 'react'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!isLoggedIn) return

    const wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')

    if (!wishlist.length) return

    const payload = wishlist.map((item) => ({
      sku: item,
      quantity: 1,
    }))

    localStorage.removeItem(GUEST_WISHLIST_STORAGE_NAME)
    addWishlistItem({ variables: { input: payload } })
  })
}
