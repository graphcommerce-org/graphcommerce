import { Asset } from '@graphcommerce/graphcms-ui'
import { BlogListItem } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Typography, useTheme } from '@mui/material'
import { BlogItemFragment } from './BlogItem.gql'

type BlogItemProps = BlogItemFragment

export function BlogItem(props: BlogItemProps) {
  const { title, url, asset, date } = props
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
      url={url}
    />
  )
}
