// @vitest-environment happy-dom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAddProductsToWishlist } from './useAddProductsToWishlist'

const mutate = vi.hoisted(() => vi.fn(async (_options: unknown) => ({})))

vi.mock('@graphcommerce/graphql', () => ({ useApolloClient: () => ({ mutate }) }))
vi.mock('@graphcommerce/magento-customer', () => ({
  useCustomerSession: () => ({ loggedIn: true }),
}))
vi.mock('@mui/material', () => ({ useEventCallback: (callback: unknown) => callback }))
vi.mock('../useWishlistitems', () => ({
  UseWishlistCustomerDocument: 'UseWishlistCustomerDocument',
  UseWishlistGuestDocument: 'UseWishlistGuestDocument',
}))

describe('useAddProductsToWishlist', () => {
  // Each page of the wishlist has its own cache entry, which the mutation result does not update.
  it('refetches the pages of the wishlist of a customer', async () => {
    const { result } = renderHook(() => useAddProductsToWishlist())

    await act(() => result.current([{ sku: 'sku', quantity: 1 }]))

    expect(mutate).toHaveBeenCalledWith(
      expect.objectContaining({ refetchQueries: ['UseWishlistCustomerDocument'] }),
    )
  })
})
