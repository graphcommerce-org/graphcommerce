import type { MeshContext } from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { filterNonNullableKeys } from '@graphcommerce/next-ui/RenderType/filterNonNullableKeys'
import { getIndexName } from './getIndexName'

export type AttributeList = { label: string; code: string }[]

export async function getAttributeList(context: MeshContext): Promise<AttributeList> {
  const cacheKey = `algolia_getAttributeList_${getIndexName(context)}`
  const attributeListCached = context.cache.get(cacheKey)
  if (attributeListCached) return attributeListCached

  if (
    import.meta.graphCommerce.magentoVersion >= 247 &&
    'attributesList' in context.m2.Query &&
    typeof context.m2.Query.attributesList === 'function'
  ) {
    const items = (await context.m2.Query.attributesList({
      args: {
        entityType: 'CATALOG_PRODUCT',
        filters: {},
      },
      selectionSet: '{ items{ code label } }',
      context,
    }).then((res) => res?.items)) as { label?: string; code: string }[]

    if (!items) throw new Error('Attribute list not found')
    await context.cache.set(cacheKey, filterNonNullableKeys(items, ['label']))

    return filterNonNullableKeys(items, ['label'])
  }

  return []
}
