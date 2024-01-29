import type { ApolloClient, NormalizedCacheObject, TypedDocumentNode } from '@graphcommerce/graphql'
import { gql } from '@graphcommerce/graphql/apollo'
import type { Exact } from '@graphcommerce/graphql-mesh'

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

export async function getFilterTypes(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<Record<string, string | undefined>> {
  const filterInputTypes = await client.query({ query: FilterInputTypesDocument })

  const typeMap: Record<string, string | undefined> = Object.fromEntries(
    filterInputTypes.data?.__type.inputFields.map(({ name, type }) => [name, type.name]),
  )

  return typeMap
}
