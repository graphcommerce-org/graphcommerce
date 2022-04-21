import { gql, ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { Exact } from '@graphcommerce/graphql-mesh'
import { AllFilterInputTypes, FilterTypes } from './filterTypes'

const allFilterInputTypes: AllFilterInputTypes[] = [
  'FilterEqualTypeInput',
  'FilterMatchTypeInput',
  'FilterRangeTypeInput',
]

type FilterInputTypesQueryVariables = Exact<{ [key: string]: never }>

type FilterInputTypesQuery = {
  __type: {
    inputFields: {
      name: string
      type: { name: AllFilterInputTypes }
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
`

export async function getFilterTypes(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<FilterTypes> {
  const filterInputTypes = client.query<FilterInputTypesQuery, FilterInputTypesQueryVariables>({
    query: FilterInputTypesDocument,
  })

  const typeMap: FilterTypes = {}

  ;(await filterInputTypes).data?.__type.inputFields.forEach(({ name, type }) => {
    if (!allFilterInputTypes.includes(type.name))
      console.warn(`filter ${name} with FilterTypeInput ${type.name} not implemented`)
    typeMap[name] = type.name
  })

  return typeMap
}
