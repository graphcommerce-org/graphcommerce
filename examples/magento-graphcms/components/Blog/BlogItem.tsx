import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { BlogListItem } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Typography } from '@material-ui/core'
import React from 'react'
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
