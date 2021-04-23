import RichText from '@reachdigital/graphcms-ui/RichText'
import NextBlogContent from '@reachdigital/next-ui/Blog/NextBlogContent'
import { RowBlogContentFragment } from './RowBlogContent.gql'

type RowBlogContentProps = RowBlogContentFragment

export default function RowBlogContent(props: RowBlogContentProps) {
  const { content } = props

  return <NextBlogContent content={<RichText raw={content?.raw} />} />
}
