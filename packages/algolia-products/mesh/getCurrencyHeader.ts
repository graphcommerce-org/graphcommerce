import type { MeshContext } from '@graphcommerce/graphql-mesh'

export function getCurrencyHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers?.[
    'content-currency'
  ]
}
