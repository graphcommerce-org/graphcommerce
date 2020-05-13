import { GQLGetStaticProps } from 'node/staticParams'
import apolloClient from 'node/apolloClient'
import { GetPortfolioListDocument } from 'generated/apollo'

const getPortfolioListProps: GQLGetStaticProps<GQLGetPortfolioListQuery> = async ({
  url,
  locale,
}) => {
  const { data } = await (await apolloClient()).query<
    GQLGetPortfolioListQuery,
    GQLGetPageLayoutQueryVariables
  >({ query: GetPortfolioListDocument, variables: { url: `${url}/`, locale } })
  return data
}

export default getPortfolioListProps
