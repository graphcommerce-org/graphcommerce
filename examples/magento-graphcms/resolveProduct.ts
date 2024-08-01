// import { resolveRootDirectiveResolver } from './.mesh/index'

import { MeshContext } from '@graphcommerce/graphql-mesh'

const resolveProduct = (root, context: MeshContext, info) => {
  console.log('ajaja')
  // return context.accounts.Query.user({ root, args: { id: root.id }, context, info })
}

export default resolveProduct
