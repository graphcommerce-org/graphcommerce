import { MeshContext } from '@graphcommerce/graphql-mesh'

export function getGroupId(context: MeshContext): number {
  const { headers } = context as MeshContext & { headers?: Record<string, string | undefined> }
  if (!headers?.authorization) return 0
  return parseInt(headers?.['x-magento-group-id'] || '0', 10)
}
