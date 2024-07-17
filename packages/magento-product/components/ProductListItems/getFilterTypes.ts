import { gql, ApolloClient, NormalizedCacheObject, TypedDocumentNode } from '@graphcommerce/graphql'
import type { AttributeFrontendInputEnum, Exact } from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { ProductFilterTypesDocument } from './ProductFilterTypes.gql'

type FilterInputTypesQueryVariables = Exact<{ [key: string]: never }>

type FilterInputTypesQuery = {
  __type: {
    inputFields: {
      name: string
      type: { name: string }
    }[]
  }
}

const FilterInputTypesDocument = gql`
  query FilterInputTypes {
    __type(name: "ProductAttributeFilterInput") {
      inputFields {
        name
        type {
          name
        }
      }
    }
  }
` as TypedDocumentNode<FilterInputTypesQuery, FilterInputTypesQueryVariables>

export type FilterTypes = Partial<Record<string, AttributeFrontendInputEnum>>

export async function getFilterTypes(
  client: ApolloClient<NormalizedCacheObject>,
  isSearch: boolean = false,
): Promise<FilterTypes> {
  if (import.meta.graphCommerce.magentoVersion >= 247) {
    const types = await client.query({
      query: ProductFilterTypesDocument,
      variables: {
        filters: isSearch ? { is_filterable_in_search: true } : {},
      },
    })

    const typeMap: FilterTypes = Object.fromEntries(
      filterNonNullableKeys(types.data.attributesList?.items, ['frontend_input'])
        .map((i) => [i.code, i.frontend_input])
        .filter(nonNullable),
    )

    return typeMap
  }

  const filterInputTypes = await client.query({ query: FilterInputTypesDocument })

  const typeMap: FilterTypes = Object.fromEntries(
    filterInputTypes.data?.__type.inputFields
      .map<[string, AttributeFrontendInputEnum] | undefined>((field) => {
        if (field.type.name === 'FilterEqualTypeInput') return [field.type.name, 'SELECT']
        if (field.type.name === 'FilterMatchTypeInput') return [field.type.name, 'TEXT']
        return undefined
      })
      .filter(nonNullable),
  )

  return typeMap
}
