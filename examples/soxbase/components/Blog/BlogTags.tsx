import { BlogTags as NextBlogTags } from '@reachdigital/next-ui'

export default function BlogTags(props) {
  const { tags } = props

  return <NextBlogTags tags={tags} />
}
