import { CRGetStaticProps } from 'components/ContentRenderer/getContentRendererProps'
import { serverClient } from 'lib/apolloServer'
import { GetAllPeopleDocument } from 'generated/apollo'

const getRowPeopleWithTextProps: CRGetStaticProps<
  GQLRowPeopleWithTextFragment,
  GQLGetAllPeopleQuery
> = async () => {
  const { data } = await (await serverClient()).query<
    GQLGetAllPeopleQuery,
    GQLGetAllPeopleQueryVariables
  >({ query: GetAllPeopleDocument })
  return data
}

export default getRowPeopleWithTextProps
