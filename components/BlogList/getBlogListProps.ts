import { GQLGetStaticProps } from 'node/staticParams'
import apolloClient from 'node/apolloClient'
import { GetBlogListDocument } from 'generated/apollo'

const getBlogListProps: GQLGetStaticProps<GQLGetBlogListQuery> = async (variables) => {
  const { data } = await (await apolloClient()).query<
    GQLGetBlogListQuery,
    GQLGetBlogListQueryVariables
  >({
    query: GetBlogListDocument,
    variables: { url: `${variables.url}/`, locale: variables.locale },
  })
  return data
}

export default getBlogListProps
