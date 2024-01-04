import { BlogContent, RichText } from '@graphcommerce/next-ui'
import { RowBlogContentProps } from './type'

/** @deprecated Replace with RowColumnOne */
export function RowBlogContent(props: RowBlogContentProps) {
  const { copy } = props
  if (!copy) return null
  return (
    <BlogContent>
      <RichText {...copy} />
    </BlogContent>
  )
}
