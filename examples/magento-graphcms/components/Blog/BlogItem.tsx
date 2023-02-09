import { Asset } from '@graphcommerce/graphcms-ui'
import { BlogListItem } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
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
            sizes={{
              0: '48vw',
              [theme.breakpoints.values.md]: '30vw',
              [theme.breakpoints.values.lg]: '25vw',
              [theme.breakpoints.values.xl]: '330px',
            }}
          />
        ) : (
          <Typography variant='body2'>
            <Trans id='No Image' />
          </Typography>
        )
      }
      title={title ?? ''}
      date={date}
      url={url}
    />
  )
}
