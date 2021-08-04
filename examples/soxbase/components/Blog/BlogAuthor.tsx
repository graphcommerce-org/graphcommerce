import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { BlogAuthor as NextBlogAuthor } from '@reachdigital/next-ui'
import { BlogAuthorFragment } from './BlogAuthor.gql'

type BlogAuthorProps = BlogAuthorFragment

export default function BlogAuthor(props: BlogAuthorProps) {
  const { author, date } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  return <NextBlogAuthor author={author ?? ''} date={date} locale={locale ?? ''} />
}
