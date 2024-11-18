import fragments from '@graphcommerce/graphql/generated/fragments.json'
import type {
  AttributeValueInterfaceResolvers,
  MeshContext,
  Resolvers,
} from '@graphcommerce/graphql-mesh'
import { customAttributeMetadataV2 } from './customAttributeMetadataV2'

type AttributeValueResolver = Pick<AttributeValueInterfaceResolvers<MeshContext>, 'attribute'>

const attributeValueResolver: AttributeValueResolver = {
  attribute: {
    selectionSet: `{ code }`,
    resolve: async (root, _, context) =>
      root.attribute ??
      (await customAttributeMetadataV2(
        { attribute_code: root.code, entity_type: 'catalog_product' },
        context,
      )),
  },
}

type AttributeValueTypes = NonNullable<
  Awaited<ReturnType<AttributeValueInterfaceResolvers['__resolveType']>>
>
const attributeValueTypes = fragments.possibleTypes.AttributeValueInterface as AttributeValueTypes[]
const resolvers: Resolvers = {}
attributeValueTypes.forEach((attributeValueType) => {
  if (!resolvers[attributeValueType]) resolvers[attributeValueType] = attributeValueResolver
})
export default resolvers
