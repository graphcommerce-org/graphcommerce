import type { MeshContext, CustomAttributeMetadataInterface } from '@graphcommerce/graphql-mesh'

export type CustomAttributeInput = { attribute_code: string; entity_type: 'catalog_product' }

export async function customAttributeMetadataV2(
  input: CustomAttributeInput,
  context: MeshContext,
): Promise<CustomAttributeMetadataInterface | null> {
  const cacheKey = `customAttributeMetadata-${input.entity_type}-${input.attribute_code}`
  const cached = await context.cache.get(cacheKey)
  if (cached) return cached

  if (input.entity_type !== 'catalog_product')
    throw Error('Only catalog_product is supported at this moment')

  if (
    !('customAttributeMetadataV2' in context.m2.Query) ||
    typeof context.m2.Query.customAttributeMetadataV2 !== 'function'
  )
    throw Error('This field is only available in Magento 2.4.7 and up')

  const attribute = await context.m2.Query.customAttributeMetadataV2({
    context,
    key: input,
    argsFromKeys: (attributes) => ({ attributes }),
    selectionSet: /* GraphQL */ `
      {
        items {
          __typename
          code
          label
          default_value
          entity_type
          frontend_class
          frontend_input
          is_required
          is_unique
          label
          ... on CatalogAttributeMetadata {
            apply_to
            is_comparable
            is_filterable
            is_filterable_in_search
            is_html_allowed_on_front
            is_searchable
            is_used_for_price_rules
            is_used_for_promo_rules
            is_visible_in_advanced_search
            is_visible_on_front
            is_wysiwyg_enabled
            used_in_product_listing
          }
          options {
            label
            is_default
            value
          }
        }
      }
    `,
    valuesFromResults: (res, attributes) =>
      attributes.map((attr) => res.items?.find((v) => v?.code === attr.attribute_code)),
  })

  // Cache for 1 hour
  await context.cache.set(cacheKey, attribute, { ttl: 60 * 60 })
  return attribute ?? null
}
