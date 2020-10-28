import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Exact } from '@reachdigital/magento-graphql'
import {
  AllFilterInputTypes,
  FilterTypeMap,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'

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

export default async function getFilterTypeMap(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<FilterTypeMap> {
  const filterInputTypes = client.query<FilterInputTypesQuery, FilterInputTypesQueryVariables>({
    query: FilterInputTypesDocument,
  })

  const typeMap: { [index: string]: typeof allFilterInputTypes[0] } = {}

  ;(await filterInputTypes).data?.__type.inputFields.forEach(({ name, type }) => {
    if (!allFilterInputTypes.includes(type.name))
      throw new Error(`filter ${name} with FilterTypeInput ${type.name} not implemented`)

    typeMap[name] = type.name
  })

  return typeMap
}
