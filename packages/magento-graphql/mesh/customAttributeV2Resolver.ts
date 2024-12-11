import type { MeshContext, ProductInterfaceResolvers, Resolvers } from '@graphcommerce/graphql-mesh'
import fragments from '@graphcommerce/graphql/generated/fragments.json'
import { Kind } from 'graphql'
import type { CustomAttributeInput } from './customAttributeMetadataV2'
import { customAttributeMetadataV2 } from './customAttributeMetadataV2'

type CustomAttributeV2Resolver = Pick<ProductInterfaceResolvers<MeshContext>, 'custom_attributeV2'>

const customAttributeV2Resolver: CustomAttributeV2Resolver = {
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

type ProductTypes = NonNullable<Awaited<ReturnType<ProductInterfaceResolvers['__resolveType']>>>
const productInterfaceTypes = fragments.possibleTypes.ProductInterface as ProductTypes[]
const resolvers: Resolvers = {}
productInterfaceTypes.forEach((productType) => {
  if (!resolvers[productType]) resolvers[productType] = customAttributeV2Resolver
})
export default resolvers
