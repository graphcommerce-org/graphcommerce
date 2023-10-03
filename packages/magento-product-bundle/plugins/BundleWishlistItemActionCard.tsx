import type { WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import type { PluginProps } from '@graphcommerce/next-config'
import { Trans } from '@lingui/react'

export const component = 'WishlistItemActionCard'
export const exported =
  '@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard'

export function BundleWishlistItemActionCard(
  props: PluginProps<React.ComponentProps<typeof WishlistItemActionCard>>,
) {
  const { Prev, ...rest } = props

  if (rest.__typename !== 'BundleWishlistItem') return <Prev {...props} />

  return (
    <Prev
      {...props}
      secondaryAction={<Trans id='Bundled products cannot be added to the cart directly.' />}
    />
  )
}

export const Plugin = BundleWishlistItemActionCard
