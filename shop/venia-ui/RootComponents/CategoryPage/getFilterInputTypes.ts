import apolloClient from 'node/apolloClient'
import { gql } from 'apollo-server-micro'

export type FilterInputTypesQueryVariables = Exact<{ [key: string]: never }>

export type FilterInputTypesQuery = {
  __type: Maybe<{
    inputFields: Maybe<Array<Pick<GQL__InputValue, 'name'> & { type: Pick<GQL__Type, 'name'> }>>
  }>
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

export default async function getFilterInputTypes() {
  const client = await apolloClient()
  const filterInputTypes = client.query<FilterInputTypesQuery, FilterInputTypesQueryVariables>({
    query: FilterInputTypesDocument,
  })
  return (await filterInputTypes).data
}
