import { BlogTags as NextBlogTags } from '@graphcommerce/next-ui'
import { BlogTagsFragment } from './BlogTags.gql'

type BlogTagsProps = BlogTagsFragment

export default function BlogTags(props: BlogTagsProps) {
  const { relatedPages } = props

  return <NextBlogTags relatedPages={relatedPages} />
}
