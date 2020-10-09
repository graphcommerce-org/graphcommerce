import { TypePolicies } from '@apollo/client'

const typePolicies: TypePolicies = {
  HistoryState: {
    // Always have a single historyState
    keyFields: (object) => object.__typename,
    // Always use the incoming data when a new cart is loaded
    fields: { pages: { merge: (_, incoming) => incoming } },
  },
}
export default typePolicies
