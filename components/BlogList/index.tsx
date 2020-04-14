import React from 'react'
import BlogListItem from './BlogListItem'

const BlogList: React.FC<GQLGetBlogListQuery> = ({ blogPosts }) => {
  return (
    <div>
      {blogPosts.map((blogPost) => (
        <BlogListItem key={blogPost.id} {...blogPost} />
      ))}
    </div>
  )
}

export default BlogList
