import { CRGetStaticProps } from 'components/ContentRenderer/getContentRendererProps'
import { serverClient } from 'lib/apolloServer'
import { GetRowColumOneAwardsDocument } from 'generated/apollo'

export const getRowColumnOneAwardsProps: CRGetStaticProps<
  GQLRowColumnOneFragment,
  GQLGetRowColumOneAwardsQuery
> = async () => {
  const { data } = await (await serverClient()).query<
    GQLGetRowColumOneAwardsQuery,
    GQLGetRowColumOneAwardsQueryVariables
  >({ query: GetRowColumOneAwardsDocument })

  return data
}

export default getRowColumnOneAwardsProps
