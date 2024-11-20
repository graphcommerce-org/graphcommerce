import { useCartEnabled } from '@graphcommerce/magento-cart'
import type { FabProps } from '@graphcommerce/next-ui'
import { Fab, iconShoppingBag, iconCheckmark } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import type { UseAddProductsToCartActionProps } from './useAddProductsToCartAction'
import { useAddProductsToCartAction } from './useAddProductsToCartAction'

export type AddProductsToCartFabProps = {
  sx?: SxProps<Theme>
  icon?: FabProps['icon']
} & Pick<FabProps, 'color' | 'size'> &
  UseAddProductsToCartActionProps

export function AddProductsToCartFab(props: AddProductsToCartFabProps) {
  const { icon = iconShoppingBag, product, sku, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)

  const cartEnabled = useCartEnabled()

  if (!cartEnabled) return null

  return (
    <Fab
      type='submit'
      {...rest}
      {...action}
      icon={showSuccess && !action.loading ? iconCheckmark : icon}
      aria-label={t`Add to Cart`}
    />
  )
}
