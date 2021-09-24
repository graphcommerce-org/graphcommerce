import { BlogList as NextBlogList } from '@graphcommerce/next-ui'
import BlogItem from './BlogItem'
import { BlogListQuery } from './BlogList.gql'

type BlogListProps = BlogListQuery

export default function BlogList(props: BlogListProps) {
  const { blogPosts } = props

  return (
    <NextBlogList>
      <>
        {blogPosts.map((BlogPost) => (
          <BlogItem key={BlogPost.title} {...BlogPost} />
        ))}
      </>
    </NextBlogList>
  )
}
