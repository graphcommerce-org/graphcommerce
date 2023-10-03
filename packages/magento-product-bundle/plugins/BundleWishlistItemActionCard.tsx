import { useProductLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import type { WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import type { PluginProps } from '@graphcommerce/next-config'
import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

export const component = 'WishlistItemActionCard'
export const exported =
  '@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard'

export function BundleWishlistItemActionCard(
  props: PluginProps<React.ComponentProps<typeof WishlistItemActionCard>>,
) {
  const { Prev, product, ...rest } = props

  const productLink = useProductLink({
    url_key: product?.url_key,
    __typename: product?.__typename ?? 'BundleProduct',
  })

  if (rest.__typename !== 'BundleWishlistItem') return <Prev {...props} />

  return (
    <Prev
      {...props}
      secondaryAction={
        <Button
          variant='text'
          color='primary'
          size='medium'
          href={productLink}
          endIcon={<IconSvg src={iconChevronRight} />}
        >
          <Trans id='Configure' />
        </Button>
      }
    />
  )
}

export const Plugin = BundleWishlistItemActionCard
