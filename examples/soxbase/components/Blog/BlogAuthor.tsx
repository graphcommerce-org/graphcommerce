import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { BlogAuthor as NextBlogAuthor } from '@graphcommerce/next-ui'
import { BlogAuthorFragment } from './BlogAuthor.gql'

type BlogAuthorProps = BlogAuthorFragment

export default function BlogAuthor(props: BlogAuthorProps) {
  const { author, date } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  return <NextBlogAuthor author={author ?? ''} date={date} locale={locale ?? ''} />
}
