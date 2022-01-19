import { Asset } from '@graphcommerce/graphcms-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { BlogListItem } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Typography, useTheme } from '@mui/material'
import { BlogItemFragment } from './BlogItem.gql'

type BlogItemProps = BlogItemFragment

export function BlogItem(props: BlogItemProps) {
  const { title, url, asset, date } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const theme = useTheme()

  return (
    <BlogListItem
      asset={
        asset ? (
          <Asset
            asset={asset}
            sizes={{ 0: '48vw', 711: '30vw', [theme.breakpoints.values.lg]: '330px' }}
          />
        ) : (
          <Typography variant='body2'>
            <Trans>No Image</Trans>
          </Typography>
        )
      }
      title={title ?? ''}
      date={date}
      locale={locale ?? ''}
      url={url}
    />
  )
}
