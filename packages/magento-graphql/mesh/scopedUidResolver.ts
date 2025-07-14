/* eslint-disable arrow-body-style */
import { fragments, getPrivateQueryContextMesh } from '@graphcommerce/graphql'
import { type MeshContext, type Resolvers } from '@graphcommerce/graphql-mesh'
import { storefrontFromContext } from '@graphcommerce/magento-store'
import { storefrontConfigDefault } from '@graphcommerce/next-ui'

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
