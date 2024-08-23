import { productLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import type { WishlistItemActionCardProps } from '@graphcommerce/magento-wishlist'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-wishlist',
}

export function WishlistItemActionCard(props: PluginProps<WishlistItemActionCardProps>) {
  const { Prev, item } = props
  const { product } = item

  if (item.__typename !== 'BundleWishlistItem' || !product) return <Prev {...props} />

  return (
    <Prev
      {...props}
      secondaryAction={
        <Button
          variant='text'
          color='primary'
          size='medium'
          href={productLink(product)}
          endIcon={<IconSvg src={iconChevronRight} />}
        >
          <Trans id='Configure' />
        </Button>
      }
    />
  )
}
