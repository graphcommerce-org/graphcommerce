import type {
  AlgoliasettingsResponse,
  MeshContext,
  ProductAttributeSortInput,
} from '@graphcommerce/graphql-mesh'
import { nonNullable } from '@graphcommerce/magento-customer'
import { getIndexName } from './getIndexName'

export async function getSortedIndex(
  context: MeshContext,
  settings: Promise<AlgoliasettingsResponse>,
  sortInput: ProductAttributeSortInput | null = {},
): Promise<string> {
  const baseIndex = getIndexName(context)
  // const availableSorting = Object.values(sortOptions)
  const [attr, dir] = Object.entries(sortInput ?? {}).filter(nonNullable)?.[0] ?? []
  if (!attr || !dir) return baseIndex

  const found = (await settings).replicas?.find(
    (replica) =>
      replica?.startsWith(`virtual(${baseIndex}_${attr}`) &&
      replica?.endsWith(`${dir?.toLowerCase()})`),
  )

  return found ? found?.slice(8, -1) : baseIndex
}
