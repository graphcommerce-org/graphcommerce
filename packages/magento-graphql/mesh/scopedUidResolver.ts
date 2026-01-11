/* eslint-disable arrow-body-style */
import { type MeshContext, type Resolvers } from '@graphcommerce/graphql-mesh'
import { fragments, getPrivateQueryContextMesh } from '@graphcommerce/graphql/server'
import { storefrontFromContext } from '@graphcommerce/magento-store/server'
import { storefrontConfigDefault } from '@graphcommerce/next-ui/server'

function scopedUid(root: { uid: string } | { id: string }, args: unknown, context: MeshContext) {
  const store = storefrontFromContext(context) ?? storefrontConfigDefault()
  const privateContext = getPrivateQueryContextMesh(context)

  const params = new URLSearchParams()
  params.set('store', store.magentoStoreCode)

  if (privateContext) {
    Object.entries(privateContext).forEach(([key, value]) => {
      if (Array.isArray(value))
        value.forEach((v) => {
          if (v) params.append(key, v)
        })
      else if (typeof value === 'string') params.set(key, value)
      else if (typeof value === 'boolean') params.set(key, value.toString())
    })
  }

  const id = 'uid' in root ? root.uid : root.id
  return `${id}?${params.toString()}`
}

export const resolvers: Resolvers = {
  ...Object.fromEntries(
    fragments.possibleTypes.ProductInterface.map((type) => [type, { uid: scopedUid }]),
  ),
}
