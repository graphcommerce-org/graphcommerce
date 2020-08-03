import { TypePolicies, FieldPolicy } from '@apollo/client'
import {
  GQLMutation,
  GQLGuestCartQuery,
  GQLQuery,
  CartIdDocument,
  GuestCartDocument,
} from 'generated/graphql'

/**
 * When an empty cart is created, we store the cartId separately
 */
const createEmptyCart: FieldPolicy<GQLMutation['createEmptyCart']> = {
  merge(_existing, cartId, options) {
    if (!cartId) return cartId

    options.cache.writeQuery({
      query: CartIdDocument,
      data: { cartId },
      broadcast: true,
    })

    // When creating a new cart we create an empty cart for the customer
    options.cache.writeQuery({
      query: GuestCartDocument,
      broadcast: true,
      variables: { cartId },
      data: {
        cart: {
          __typename: 'Cart',
          id: cartId,
          is_virtual: false,
          total_quantity: 0,
          shipping_addresses: [],
          email: null,
          items: [],
          prices: {
            applied_taxes: [],
            discounts: [],
            grand_total: null,
            subtotal_excluding_tax: null,
            subtotal_including_tax: null,
            subtotal_with_discount_excluding_tax: null,
          },
        },
      },
    })

    return cartId
  },
}

/**
 * When a customer cart is loaded, we store the cartId separately
 */
const customerCart: FieldPolicy<GQLQuery['customerCart']> = {
  merge(_existing, cart, options) {
    options.cache.writeQuery({
      query: CartIdDocument,
      data: { cartId: cart.id },
      broadcast: true,
    })

    // When creating a new cart we create an empty cart for the customer
    options.cache.writeQuery({
      query: GuestCartDocument,
      data: {
        cart: (cart as unknown) as GQLGuestCartQuery['cart'],
      },
    })

    return cart
  },
}

const typePolicies: TypePolicies = {
  Query: { fields: { customerCart } },
  Mutation: { fields: { createEmptyCart } },
}

export default typePolicies
