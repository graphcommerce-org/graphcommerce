import { BlogTag, BlogTags as NextBlogTags } from '@graphcommerce/next-ui'
import { BlogTagsFragment } from './BlogTags.gql'

type BlogTagsProps = BlogTagsFragment

export function BlogTags(props: BlogTagsProps) {
  const { relatedPages } = props
  return (
    <NextBlogTags>
      {relatedPages.map(({ url, title }) => {
        if (!title) return null
        return <BlogTag key={url} url={url} title={title} />
      })}
    </NextBlogTags>
  )
}
