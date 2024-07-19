import type { MeshContext } from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { filterNonNullableKeys } from '@graphcommerce/next-ui/RenderType/filterNonNullableKeys'

export type AttributeList = { label: string; code: string }[]

export async function getAttributeList(context: MeshContext): Promise<AttributeList> {
  if (import.meta.graphCommerce.magentoVersion >= 247 && 'attributesList' in context.m2.Query && typeof context.m2.Query.attributesList === 'function') {
    const items = await context.m2.Query.attributesList({
      args: {
        entityType: 'CATALOG_PRODUCT',
        filters: {},
      },
      selectionSet: `{ items{ code label } }`,
      context,
    }).then((res) => res?.items) as { label?: string; code: string }[]

    return filterNonNullableKeys(items, ['label'])
  }

  return []
}
