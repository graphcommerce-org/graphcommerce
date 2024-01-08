import { BlogContent } from '@graphcommerce/next-ui'
import { RowBlogContentProps } from './type'

/** @deprecated Replace with RowColumnOne */
export function RowBlogContent(props: RowBlogContentProps) {
  const { copy } = props
  if (!copy || typeof copy === 'object') return null
  return <BlogContent>{copy}</BlogContent>
}
