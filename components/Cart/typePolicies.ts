import { TypePolicies } from '@apollo/client'

const typePolicies: TypePolicies = {
  Cart: {
    // Always have a single cart
    keyFields: (object) => object.__typename,

    // Always use the incoming data when a new cart is loaded
    fields: { items: { merge: (_, incoming) => incoming } },
  },
}

export default typePolicies
