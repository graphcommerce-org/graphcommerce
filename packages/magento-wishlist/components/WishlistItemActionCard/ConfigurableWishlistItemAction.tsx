import { productLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import { type WishlistItemActionCardProps } from '@graphcommerce/magento-wishlist'
import { IconSvg, iconChevronRight, nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { AddWishlistItemToCart } from '../WishlistItem/AddWishlistItemToCart'

type ConfigurableWishlistItemActionProps = Omit<WishlistItemActionCardProps, 'selectedOptions'>

export function ConfigurableWishlistItemAction(props: ConfigurableWishlistItemActionProps) {
  const { item } = props
  const { product, id } = item

  if (
    product?.__typename !== 'ConfigurableProduct' ||
    item.__typename !== 'ConfigurableWishlistItem'
  )
    return null
  const { configurable_options } = item

  const selectedOptions = configurable_options
    ?.filter(nonNullable)
    .map((option) => option?.configurable_product_option_value_uid)

  const incompleteConfiguration =
    product.configurable_options?.length !== configurable_options?.length

  return incompleteConfiguration ? (
    <Button
      variant='inline'
      color='primary'
      size='medium'
      href={`${productLink(product)}?wishlistItemId=${id}`}
      endIcon={<IconSvg src={iconChevronRight} />}
    >
      <Trans id='Configure' />
    </Button>
  ) : (
    <AddWishlistItemToCart product={product} selectedOptions={selectedOptions} />
  )
}
