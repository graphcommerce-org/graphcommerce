import { CRGetStaticProps } from 'components/ContentRenderer/getContentRendererProps'
import apolloClient from 'node/apolloClient'
import { GetRowColumOneAwardsDocument } from 'generated/apollo'

export const getRowColumnOneAwardsProps: CRGetStaticProps<
  GQLRowColumnOneFragment,
  GQLGetRowColumOneAwardsQuery
> = async () => {
  const { data } = await (await apolloClient()).query<
    GQLGetRowColumOneAwardsQuery,
    GQLGetRowColumOneAwardsQueryVariables
  >({ query: GetRowColumOneAwardsDocument })

  return data
}

export default getRowColumnOneAwardsProps
