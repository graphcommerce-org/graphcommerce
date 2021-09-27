import RichText from '@graphcommerce/graphcms-ui/RichText'
import { BlogContent } from '@graphcommerce/next-ui'
import { RowBlogContentFragment } from './RowBlogContent.gql'

type RowBlogContentProps = RowBlogContentFragment

export default function RowBlogContent(props: RowBlogContentProps) {
  const { content } = props

  return <BlogContent content={<RichText raw={content?.raw} />} />
}
