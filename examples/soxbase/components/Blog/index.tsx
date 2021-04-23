import NextBlogList from '@reachdigital/next-ui/Blog/NextBlogList'
import BlogItem from './BlogItem'
import { BlogListQuery } from './BlogList.gql'

type BlogListProps = BlogListQuery

export default function BlogList(props: BlogListProps) {
  const { blogPosts } = props

  return (
    <NextBlogList
      blogItems={
        <>
          {blogPosts.map((BlogPost) => (
            <BlogItem key={BlogPost.title} {...BlogPost} />
          ))}
        </>
      }
    />
  )
}
