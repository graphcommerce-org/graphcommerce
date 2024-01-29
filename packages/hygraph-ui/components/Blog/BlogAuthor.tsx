import { BlogAuthor as NextBlogAuthor } from '@graphcommerce/next-ui'
import { BlogAuthorFragment } from './BlogAuthor.gql'

type BlogAuthorProps = BlogAuthorFragment

export function BlogAuthor(props: BlogAuthorProps) {
  const { author, date } = props
  if (!author) return null
  return <NextBlogAuthor author={author} date={date} />
}
