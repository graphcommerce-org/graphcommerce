import { ConfigurableWishlistItem } from '@graphcommerce/graphql-mesh'
import { useProductLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import { type WishlistItemActionCardProps } from '@graphcommerce/magento-wishlist'
import { AddWishlistItemToCart } from '@graphcommerce/magento-wishlist/components/WishlistItem/AddWishlistItemToCart'
import { IconSvg, iconChevronRight, nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'

type ConfigurableWishlistItemActionProps = Omit<WishlistItemActionCardProps, 'selectedOptions'> &
  ConfigurableWishlistItem

export function ConfigurableWishlistItemAction(props: ConfigurableWishlistItemActionProps) {
  const { configurable_options, product, id: wishlistItemId } = props

  const productLink = useProductLink({
    url_key: product?.url_key,
    __typename: product?.__typename ?? 'ConfigurableProduct',
  })

  const selectedOptions = configurable_options
    ?.filter(nonNullable)
    .map((option) => option?.configurable_product_option_value_uid)

  const isConfigurableUncompleted =
    product?.__typename === 'ConfigurableProduct' &&
    product?.configurable_options?.length !== configurable_options?.length

  return isConfigurableUncompleted ? (
    <Button
      variant='text'
      color='primary'
      size='medium'
      href={`${productLink}?wishlistItemId=${wishlistItemId}`}
      endIcon={<IconSvg src={iconChevronRight} />}
    >
      <Trans id='Configure' />
    </Button>
  ) : (
    product && <AddWishlistItemToCart product={product} selectedOptions={selectedOptions} />
  )
}
