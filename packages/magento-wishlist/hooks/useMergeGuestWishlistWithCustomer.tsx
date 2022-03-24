import { useMutation, useQuery } from '@apollo/client'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import {
  GUEST_WISHLIST_STORAGE_NAME,
  AddProductToWishlistDocument,
} from '@graphcommerce/magento-wishlist'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!isLoggedIn) return

    let wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')

    if (!wishlist.length) return

    let payload = wishlist.map((item) => ({
      sku: item,
      quantity: 1,
    }))

    localStorage.setItem(GUEST_WISHLIST_STORAGE_NAME, JSON.stringify([]))
    addWishlistItem({ variables: { input: payload } })
  })
}
