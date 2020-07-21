import { TypePolicies, FieldPolicy } from '@apollo/client'
import { CartIdDocument } from 'generated/apollo'

/**
 * When an empty cart is created, we store the cartId separately
 */
const createEmptyCart: FieldPolicy<GQLCreateEmptyCartMutation['createEmptyCart']> = {
  merge(_existing, cartId, options) {
    options.cache.writeQuery<GQLCartIdQuery, GQLCartIdQueryVariables>({
      query: CartIdDocument,
      data: { cartId },
      broadcast: true,
    })
    return cartId
  },
}

/**
 * When a customer cart is loaded, we store the cartId separately
 */
const getCustomerCart: FieldPolicy<GQLGetCustomerCartQuery['customerCart']> = {
  merge(_existing, cart, options) {
    options.cache.writeQuery<GQLCartIdQuery, GQLCartIdQueryVariables>({
      query: CartIdDocument,
      data: { cartId: cart.id },
      broadcast: true,
    })
    return cart
  },
}

const typePolicies: TypePolicies = {
  Query: { fields: { getCustomerCart } },
  Mutation: { fields: { createEmptyCart } },
}

export default typePolicies
