import { CRGetStaticProps } from 'components/ContentRenderer/getContentRendererProps'
import apolloClient from 'node/apolloClient'
import { GetAllPeopleDocument } from 'generated/apollo'

const getRowPeopleWithTextProps: CRGetStaticProps<
  GQLRowPeopleWithTextFragment,
  GQLGetAllPeopleQuery
> = async () => {
  const { data } = await (await apolloClient()).query<
    GQLGetAllPeopleQuery,
    GQLGetAllPeopleQueryVariables
  >({ query: GetAllPeopleDocument })
  return data
}

export default getRowPeopleWithTextProps
