import { gql, ApolloClient, NormalizedCacheObject, TypedDocumentNode } from '@graphcommerce/graphql'
import { Exact, graphqlQueryPassToClient } from '@graphcommerce/graphql-mesh'

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

export async function getFilterTypes(): Promise<Record<string, string | undefined>> {
  const filterInputTypes = await graphqlQueryPassToClient(FilterInputTypesDocument)

  const typeMap: Record<string, string | undefined> = Object.fromEntries(
    filterInputTypes.data?.__type.inputFields.map(({ name, type }) => [name, type.name]),
  )

  return typeMap
}
