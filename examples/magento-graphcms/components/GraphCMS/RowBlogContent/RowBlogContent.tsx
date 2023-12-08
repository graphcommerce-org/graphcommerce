import { RichText } from '@graphcommerce/graphcms-ui'
import { BlogContent } from '@graphcommerce/next-ui'
import { RowBlogContentProps } from './type'

export function RowBlogContent(props: RowBlogContentProps) {
  const { content } = props
  if (!content) return null
  return (
    <BlogContent>
      <RichText {...content} />
    </BlogContent>
  )
}
