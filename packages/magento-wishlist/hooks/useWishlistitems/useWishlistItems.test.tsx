// @vitest-environment happy-dom
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UseWishlistCustomerDocument } from './UseWishlistCustomer.gql'
import { useWishlistItems } from './useWishlistItems'

const useCustomerQuery = vi.hoisted(() =>
  vi.fn((_document: unknown, _options: unknown) => ({
    data: {
      customer: { wishlists: [{ items_count: 25, items_v2: { items: [{ id: '1' }] } }] },
    },
  })),
)

vi.mock('@graphcommerce/magento-customer', () => ({
  useCustomerQuery,
  useCustomerSession: () => ({ loggedIn: true }),
  useGuestQuery: () => ({ data: undefined }),
}))
vi.mock('@graphcommerce/next-config/config', () => ({ wishlistHideForGuests: false }))
vi.mock('@graphcommerce/next-ui', () => ({
  nonNullable: (value: unknown) => value !== null && value !== undefined,
}))
vi.mock('../useWishlistEnabled/useWishlistEnabled', () => ({ useWishlistEnabled: () => true }))

describe('useWishlistItems', () => {
  it('loads the requested page of the wishlist', () => {
    renderHook(() => useWishlistItems(2, 5))

    expect(useCustomerQuery).toHaveBeenCalledWith(
      UseWishlistCustomerDocument,
      expect.objectContaining({ variables: { currentPage: 2, pageSize: 5 } }),
    )
  })

  it('returns the number of items in the wishlist, also when a page holds fewer items', () => {
    const { result } = renderHook(() => useWishlistItems(1, 1))

    expect(result.current.items).toHaveLength(1)
    expect(result.current.count).toBe(25)
  })
})
