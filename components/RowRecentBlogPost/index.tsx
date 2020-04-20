import React from 'react'
import { useGetBlogListQuery } from '../../generated/apollo'
import BlogList from '../BlogList'
import initApolloClient from '../../lib/apollo'
import LinkInternal from '../LinkInternal/LinkInternal'

const RowRecentBlogPost: React.FC<GQLRowRecentBlogPostFragment> = ({ link }) => {
  if (!link || !link.page) {
    return <>Please provide link in RowRecentBlogPost</>
  }

  const { data, loading } = useGetBlogListQuery({
    client: initApolloClient(),
    variables: { locale: link.locale, url: `${link.page.url}/`, first: 3 },
  })

  if (!data || loading) {
    return <>Loading</>
  }

  return (
    <>
      <BlogList blogPosts={data.blogPosts} />
      <LinkInternal {...link} />
    </>
  )
}

export default RowRecentBlogPost
