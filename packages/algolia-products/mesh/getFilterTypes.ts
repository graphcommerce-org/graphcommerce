import type { AttributeFrontendInputEnum, MeshContext } from '@graphcommerce/graphql-mesh'
import type { FilterTypes } from '@graphcommerce/magento-product'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { Kind, type GraphQLSchema } from 'graphql'

/**
 * Same as packages/magento-product/components/ProductListItems/getFilterTypes.ts, but usign the
 * mesh.
 */
export async function getFilterTypes(context: MeshContext): Promise<FilterTypes> {
  if (magentoVersion >= 247) {
    try {
      const types = await context.m2.Query.attributesList({
        context,
        args: { entityType: 'CATALOG_PRODUCT' },
        selectionSet: '{ items { code frontend_input } }',
      })

      return Object.fromEntries(
        filterNonNullableKeys(types?.items, ['frontend_input'])
          .map((i) => [i.code, i.frontend_input])
          .filter(nonNullable),
      )
    } catch (error) {
      // Fallback to the old way
    }
  }

  const type = (
    context.m2 as typeof context.m2 & { rawSource?: { schema?: GraphQLSchema } }
  )?.rawSource?.schema?.getType('ProductAttributeFilterInput')

  if (type?.astNode?.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION && type.astNode.fields) {
    const typeMap: FilterTypes = Object.fromEntries(
      type.astNode.fields
        .map<[string, AttributeFrontendInputEnum] | undefined>((field) => {
          if (field.type.kind === Kind.NAMED_TYPE) {
            if (field.type.name.value === 'FilterEqualTypeInput')
              return [field.name.value, 'SELECT']
            if (field.type.name.value === 'FilterRangeTypeInput') return [field.name.value, 'PRICE']
            if (field.type.name.value === 'FilterMatchTypeInput') return [field.name.value, 'TEXT']
          }
          return undefined
        })
        .filter(nonNullable),
    )

    return typeMap
  }

  return {}
}
