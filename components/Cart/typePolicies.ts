import { TypePolicies } from '@apollo/client'

const typePolicies: TypePolicies = {
  // Always use the incoming data when a new cart is loaded
  Cart: { fields: { items: { merge: (_, incoming) => incoming } } },
}

export default typePolicies
