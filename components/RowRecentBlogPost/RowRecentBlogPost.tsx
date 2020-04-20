import React from 'react'
import { useGetBlogListQuery } from '../../generated/apollo'
import BlogList from '../BlogList'
import initApolloClient from '../../lib/apollo'

const RowRecentBlogPost: React.FC = () => {
  const { data, loading } = useGetBlogListQuery({
    client: initApolloClient(),
    variables: { locale: 'nl', url: '/blog/', first: 3 },
  })

  if (!data || loading) {
    return <div>Loading</div>
  }

  return <BlogList blogPosts={data.blogPosts} />
}

export default RowRecentBlogPost
