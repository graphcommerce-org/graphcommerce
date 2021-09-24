import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { BlogListItem } from '@graphcommerce/next-ui'
import Asset from '../Asset'
import { BlogItemFragment } from './BlogItem.gql'

type BlogItemProps = BlogItemFragment

export default function BlogItem(props: BlogItemProps) {
  const { title, url, asset, date } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  return (
    <BlogListItem
      asset={
        asset ? (
          <Asset asset={asset} sizes={{ 0: '100vw', 800: '800px' }} />
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
