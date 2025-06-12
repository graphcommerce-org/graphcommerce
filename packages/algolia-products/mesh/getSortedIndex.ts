import type { MeshContext, ProductAttributeSortInput } from '@graphcommerce/graphql-mesh'
import { nonNullable } from '@graphcommerce/magento-customer'
import type { GetAlgoliaSettingsReturn } from './getAlgoliaSettings'
import { getGroupId } from './getGroupId'
import { getIndexName } from './getIndexName'

function stripVirtual(index: string) {
  return index.slice(8, -1)
}

export async function getSortedIndex(
  context: MeshContext,
  settings: Promise<GetAlgoliaSettingsReturn>,
  sortInput: ProductAttributeSortInput | null = {},
): Promise<string> {
  const baseIndex = getIndexName(context)
  // const availableSorting = Object.values(sortOptions)
  const [attr, dirEnum] = Object.entries(sortInput ?? {}).filter(nonNullable)?.[0] ?? []
  if (!attr || !dirEnum) return baseIndex

  const dir = dirEnum.toLowerCase()
  const candidates = ((await settings).replicas ?? [])
    .filter(nonNullable)
    .filter((r) => r.startsWith(`virtual(${baseIndex}_${attr}`) && r.endsWith(`_${dir})`))

  if (candidates.length === 0) {
    console.warn(
      `[@graphcommerce/algolia-products] WARNING: Expecting virtual replica but couldn't find the expected index for attr ${attr} with ${dir}, please add to the Algolia settings in the Magento Admin Panel. Falling back to baseIndex: ${baseIndex}.`,
    )
    return baseIndex
  }

  if (attr === 'price') {
    const enabled = import.meta.graphCommerce.algolia.customerGroupPricingEnabled

    const groupId = enabled ? getGroupId(context) : 'default'
    const found = candidates.find((r) => r.endsWith(`${groupId}_${dir})`))

    if (!found) {
      console.warn(
        '[@graphcommerce/algolia-products] WARNING: Can not find correct price index.',
        'It should look something like:',
        `virtual(${baseIndex}_${attr}_${groupId}_${dir})`,
        'Available indexes (using the first one):',
        candidates,
      )
      return stripVirtual(candidates[0])
    }

    return stripVirtual(found)
  }

  return stripVirtual(candidates[0])
}
