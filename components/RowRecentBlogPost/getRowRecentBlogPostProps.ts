import { serverClient } from 'lib/apolloServer'
import { GetBlogListDocument } from 'generated/apollo'
import { CRGetStaticProps } from 'components/ContentRenderer/getContentRendererProps'

const getRowRecentBlogPostProps: CRGetStaticProps<
  GQLRowRecentBlogPostFragment,
  GQLGetBlogListQuery
> = async ({ link }) => {
  if (!link || !link.page)
    throw new Error('Make sure there is a link with a page for GQLGetBlogListQuery')

  const { data } = await (await serverClient()).query<
    GQLGetBlogListQuery,
    GQLGetBlogListQueryVariables
  >({
    query: GetBlogListDocument,
    variables: { locale: link.locale, url: `${link?.page?.url}/`, first: 3 },
  })

  return data
}

export default getRowRecentBlogPostProps
