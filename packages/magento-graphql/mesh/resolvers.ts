import fragments from '@graphcommerce/graphql/generated/fragments.json'
import type {
  CustomAttributeMetadataInterface,
  MeshContext,
  ProductInterfaceResolvers,
  Resolvers,
  ResolversTypes,
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

  const response = context.m2.Query.customAttributeMetadataV2({
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
    valuesFromResults: (values, attributes) =>
      attributes.map((attribute) =>
        values.items?.find((v) => v?.code === attribute.attribute_code),
      ),
  })

  // Cache for 1 hour
  await context.cache.set(cacheKey, response, { ttl: 60 * 60 })
  return response
}

type ProductResolver = Pick<ProductInterfaceResolvers<MeshContext>, 'custom_attribute_option'>

const productResolver: ProductResolver = {
  custom_attribute_option: {
    selectionSet: (fieldNode) => ({
      kind: Kind.SELECTION_SET,
      selections: (fieldNode.arguments ?? [])
        .map((arg) => arg.value)
        .filter((value) => value.kind === Kind.STRING)
        .map((value) => ({ kind: Kind.FIELD, name: { kind: Kind.NAME, value: value.value } })),
    }),
    resolve: async (root, { attribute_code }, context) => {
      if (import.meta.graphCommerce.magentoVersion <= 246) {
        throw Error('This field is only available in Magento 2.4.7 and up')
      }

      type Result = ResolversTypes['CustomAttributeOptionOutput']
      const result: Result = {
        raw: `${root[attribute_code]}`,
        options: [],
        attribute: null,
        errors: [],
      }

      const values = result.raw.includes(',')
        ? [result.raw, ...result.raw.split(',')]
        : [result.raw]
      const attribute = await customAttributeMetadataV2(
        { attribute_code, entity_type: 'catalog_product' },
        context,
      )

      result.attribute = attribute

      if (!attribute) {
        const message = `Attribute '${attribute_code}' found, but option ${values.join(', ')} not found`
        result.errors.push({ message, type: 'ATTRIBUTE_NOT_FOUND' })
        return result
      }

      values.forEach((v) => {
        const found = attribute.options?.find((o) => o?.value === v || o?.label === v)
        if (found) {
          result.options?.push(found)
        } else {
          const message = `Option '${v}' not found for attribute '${attribute_code}'`
          result.errors.push({ message, type: 'ATTRIBUTE_NOT_FOUND' })
        }
      })
      return result
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
