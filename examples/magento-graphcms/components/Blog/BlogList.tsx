import { BlogItemGrid } from '@graphcommerce/next-ui'
import { BlogItem } from './BlogItem'
import { BlogListQuery } from './BlogList.gql'

type BlogListProps = BlogListQuery

export function BlogList(props: BlogListProps) {
  const { blogPosts } = props

  return (
    <BlogItemGrid>
      {blogPosts.map((BlogPost) => (
        <BlogItem key={BlogPost.title} {...BlogPost} />
      ))}
    </BlogItemGrid>
  )
}
