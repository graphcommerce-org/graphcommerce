import { productLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import type { WishlistItemActionCardProps } from '@graphcommerce/magento-wishlist'
import type { PluginProps } from '@graphcommerce/next-config'
import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

export const component = 'WishlistItemActionCard'
export const exported =
  '@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard'

export const BundleWishlistItemActionCard = (props: PluginProps<WishlistItemActionCardProps>) => {
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

export const Plugin = BundleWishlistItemActionCard
