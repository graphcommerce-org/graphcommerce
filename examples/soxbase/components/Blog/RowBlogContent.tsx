import RichText from '@reachdigital/graphcms-ui/RichText'
import { BlogContent } from '@reachdigital/next-ui'
import { RowBlogContentFragment } from './RowBlogContent.gql'

type RowBlogContentProps = RowBlogContentFragment

export default function RowBlogContent(props: RowBlogContentProps) {
  const { content } = props

  return <BlogContent content={<RichText raw={content?.raw} />} />
}
