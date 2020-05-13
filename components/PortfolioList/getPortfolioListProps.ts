import { GQLGetStaticProps } from 'lib/staticParams'
import { serverClient } from 'lib/apolloServer'
import { GetPortfolioListDocument } from 'generated/apollo'

const getPortfolioListProps: GQLGetStaticProps<GQLGetPortfolioListQuery> = async ({
  url,
  locale,
}) => {
  const { data } = await (await serverClient()).query<
    GQLGetPortfolioListQuery,
    GQLGetPageLayoutQueryVariables
  >({ query: GetPortfolioListDocument, variables: { url: `${url}/`, locale } })
  return data
}

export default getPortfolioListProps
