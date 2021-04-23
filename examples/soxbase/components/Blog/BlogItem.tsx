import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import NextBlogListItem from '@reachdigital/next-ui/Blog/NextBlogListItem'
import Asset from '../Asset'
import { BlogItemFragment } from './BlogItem.gql'

type BlogItemProps = BlogItemFragment

export default function BlogItem(props: BlogItemProps) {
  const { title, url, asset, date } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
      Date={(classes) => (
        <time className={classes.date} dateTime={date}>
          {formatter.format(new Date(date))}
        </time>
      )}
      url={url}
    />
  )
}
