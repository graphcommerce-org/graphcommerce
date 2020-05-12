import { GQLGetStaticProps } from 'lib/staticParams'
import { serverClient } from 'lib/apolloServer'
import { GetBlogListDocument } from 'generated/apollo'

const getBlogListProps: GQLGetStaticProps<GQLGetBlogListQuery> = async (variables) => {
  const { data } = await (await serverClient()).query<
    GQLGetBlogListQuery,
    GQLGetBlogListQueryVariables
  >({
    query: GetBlogListDocument,
    variables: { url: `${variables.url}/`, locale: variables.locale },
  })
  return data
}

export default getBlogListProps
