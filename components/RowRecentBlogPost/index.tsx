import React from 'react'
import LinkInternal from '../LinkInternal/LinkInternal'
import BlogList from '../BlogList'
import { CRGetStaticProps } from '../ContentRenderer/ContentRenderer'

const RowRecentBlogPost: React.FC<GQLRowRecentBlogPostFragment & GQLGetBlogListQuery> = ({
  link,
  blogPosts,
}) => {
  if (!link || !link.page) {
    return <>Please provide link in RowRecentBlogPost</>
  }

  return (
    <>
      <BlogList blogPosts={blogPosts} />
      <LinkInternal {...link} />
    </>
  )
}

export default RowRecentBlogPost

export const getStaticProps: CRGetStaticProps<
  GQLRowRecentBlogPostFragment,
  GQLGetBlogListQuery
> = async ({ link }) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetBlogListDocument } = await import('../../generated/apollo')

  if (!link || !link.page)
    throw new Error('Make sure there is a link with a page for GQLGetBlogListQuery')

  const { data } = await client().query<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>({
    query: GetBlogListDocument,
    variables: { locale: link.locale, url: `${link?.page?.url}/`, first: 3 },
  })

  return data
}
