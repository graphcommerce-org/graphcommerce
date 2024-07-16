import type { MeshContext } from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { filterNonNullableKeys } from '@graphcommerce/next-ui/RenderType/filterNonNullableKeys'

export type AttributeList = { label: string; code: string }[]

const attributeListCache = new Map<string, AttributeList>()

export async function attributeList(
  context: MeshContext,
  isSearch: boolean,
): Promise<AttributeList> {
  const cacheKey = isSearch ? 'search' : 'default'

  if (attributeListCache.has(cacheKey)) {
    return attributeListCache.get(cacheKey) as AttributeList
  }
  if (!attributeListCache.has(cacheKey)) {
    if (import.meta.graphCommerce.magentoVersion >= 247) {
      const items = await context.m2.Query.attributesList({
        args: {
          entityType: 'CATALOG_PRODUCT',
          filters: isSearch ? { is_filterable_in_search: true } : { is_filterable: true },
        },
        selectionSet: `{ items{ code label } }`,
        context,
      }).then((res) => res?.items)

      attributeListCache.set(cacheKey, filterNonNullableKeys(items, ['label']))
    } else {
      attributeListCache.set(cacheKey, [])
    }
  }

  return attributeListCache.get(cacheKey) as AttributeList
}
