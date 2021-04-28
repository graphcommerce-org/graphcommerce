import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import NextBlogListItem from '@reachdigital/next-ui/Blog/BlogListItem'
import Asset from '../Asset'
import { BlogItemFragment } from './BlogItem.gql'

type BlogItemProps = BlogItemFragment

export default function BlogItem(props: BlogItemProps) {
  const { title, url, asset, date } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  return (
    <NextBlogListItem
      asset={
        asset ? (
          <Asset asset={asset} width={328} />
        ) : (
          <Typography variant='body2'>No Image</Typography>
        )
      }
      title={title ?? ''}
      date={date}
      locale={locale ?? ''}
      url={url}
    />
  )
}
