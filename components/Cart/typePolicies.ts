import { FieldPolicy, TypePolicies } from '@apollo/client'
import { CartDocument } from 'generated/apollo'

/**
 * When an empty cart is created, we store the cartId separately
 */
const createEmptyCart: FieldPolicy<GQLMutation['createEmptyCart']> = {
  merge(_existing, cartId, options) {
    if (!cartId) return cartId

    // When creating a new cart we create an empty cart for the customer
    options.cache.writeQuery<GQLCartQuery, GQLCartQueryVariables>({
      query: CartDocument,
      broadcast: true,
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

const typePolicies: TypePolicies = {
  Mutation: { fields: { createEmptyCart } },
  Cart: {
    // Always have a single cart
    keyFields: (object) => object.__typename,

    // Always use the incoming data when a new cart is loaded
    fields: { items: { merge: (_, incoming) => incoming } },
  },
}

export default typePolicies
