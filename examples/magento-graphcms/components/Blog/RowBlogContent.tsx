import { RichText } from '@graphcommerce/hygraph-ui'
import { BlogContent } from '@graphcommerce/next-ui'
import { RowBlogContentFragment } from './RowBlogContent.gql'

type RowBlogContentProps = RowBlogContentFragment

export function RowBlogContent(props: RowBlogContentProps) {
  const { content } = props
  if (!content) return null
  return (
    <BlogContent>
      <RichText {...content} />
    </BlogContent>
  )
}
