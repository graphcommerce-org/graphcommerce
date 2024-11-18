import fragments from '@graphcommerce/graphql/generated/fragments.json'
import type {
  CustomAttributeMetadataInterface,
  MeshContext,
  ProductInterfaceResolvers,
  Resolvers,
} from '@graphcommerce/graphql-mesh'
import { Kind } from 'graphql'

type CustomAttributeInput = { attribute_code: string; entity_type: 'catalog_product' }

async function customAttributeMetadataV2(
  input: CustomAttributeInput,
  context: MeshContext,
): Promise<CustomAttributeMetadataInterface | undefined | null> {
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

  const attribute = context.m2.Query.customAttributeMetadataV2({
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
  return attribute
}

type ProductResolver = Pick<ProductInterfaceResolvers<MeshContext>, 'custom_attributeV2'>

const productResolver: ProductResolver = {
  custom_attributeV2: {
    selectionSet: (fieldNode) => ({
      kind: Kind.SELECTION_SET,
      selections: (fieldNode.arguments ?? [])
        .map((arg) => arg.value)
        .filter((value) => value.kind === Kind.STRING)
        .map((value) => ({ kind: Kind.FIELD, name: { kind: Kind.NAME, value: value.value } })),
    }),
    resolve: async (root, { attribute_code: code }, context) => {
      const value = String(root[code] ?? '')
      const input: CustomAttributeInput = { attribute_code: code, entity_type: 'catalog_product' }
      const attribute = await customAttributeMetadataV2(input, context)

      if (!attribute || !value) return null

      if (
        attribute?.frontend_input &&
        ['SELECT', 'MULTISELECT'].includes(attribute.frontend_input)
      ) {
        const values = attribute.frontend_input === 'SELECT' ? [value] : value.split(',')
        const selected_options = values.map((v) => {
          const found = attribute.options?.find((o) => o?.value === v || o?.label === v)
          if (!found) return null
          return { ...found, __typename: 'AttributeSelectedOption' }
        })
        return { __typename: 'AttributeSelectedOptions', code, selected_options, attribute }
      }
      return { __typename: 'AttributeValue', code, value, attribute }
    },
  },
}

const resolvers: Resolvers = {}

type ProductTypes = NonNullable<Awaited<ReturnType<ProductInterfaceResolvers['__resolveType']>>>
const productInterfaceTypes = fragments.possibleTypes.ProductInterface as ProductTypes[]

productInterfaceTypes.forEach((productType) => {
  if (!resolvers[productType]) resolvers[productType] = productResolver
})

export default resolvers
