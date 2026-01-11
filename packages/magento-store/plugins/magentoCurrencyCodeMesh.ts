import {
  type getPrivateQueryContextMesh as getPrivateQueryContextMeshType,
  type getPrivateQueryContext as getPrivateQueryContextType,
} from '@graphcommerce/graphql'
import type { PrivateContext } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
// Import directly from specific file to avoid barrel export pulling in client components
import { cookie } from '@graphcommerce/next-ui/utils/cookie'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getPrivateQueryContextMesh: FunctionPlugin<typeof getPrivateQueryContextMeshType> = (
  prev,
  context,
) => {
  const currencyCode = context.headers?.['content-currency']

  const res = prev(context)
  if (!currencyCode) return res
  return { ...res, currencyCode } satisfies PrivateContext
}

export const getPrivateQueryContext: FunctionPlugin<typeof getPrivateQueryContextType> = (
  prev,
  client,
  ...args
) => {
  const currencyCode = cookie('Magento-Content-Currency')

  const res = prev(client, ...args)
  if (!currencyCode) return res
  return { ...res, currencyCode } satisfies PrivateContext
}
