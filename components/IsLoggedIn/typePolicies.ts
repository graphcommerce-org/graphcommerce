import { TypePolicies, makeVar } from '@apollo/client'

const isLoggedInVar = makeVar(false)

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      isLoggedIn: (existing: boolean, options) => {
        console.log(options)
        return isLoggedInVar()
      },
    },
  },
}

export default typePolicies
