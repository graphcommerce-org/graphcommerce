import { RichText } from '@graphcommerce/graphcms-ui'
import { BlogContent } from '../../Blog/BlogContent/BlogContent'
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
