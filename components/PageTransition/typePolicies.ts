import { makeVar, TypePolicies } from '@apollo/client'

export const historyStateVar = makeVar<GQLQuery['historyState']>({
  direction: 'FORWARD',
  idx: 0,
  pages: [],
  phase: 'REGISTERED',
})

const typePolicies: TypePolicies = {
  Query: { fields: { historyState: () => historyStateVar() } },
}
export default typePolicies
