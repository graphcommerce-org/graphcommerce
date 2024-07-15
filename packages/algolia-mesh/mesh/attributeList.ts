import type { MeshContext } from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { filterNonNullableKeys } from '@graphcommerce/next-ui/RenderType/filterNonNullableKeys'

export type AttributeList = { label: string; code: string }[]

export async function attributeList(
  context: MeshContext,
  isSearch: boolean,
): Promise<AttributeList> {
  if (import.meta.graphCommerce.magentoVersion >= 247) {
    const items = await context.m2.Query.attributesList({
      args: {
        entityType: 'CATALOG_PRODUCT',
        filters: isSearch ? { is_filterable_in_search: true } : { is_filterable: true },
      },
      selectionSet: `{ items{ code label } }`,
      context,
    }).then((res) => res?.items)

    return filterNonNullableKeys(items, ['label'])
  }

  return []
}
