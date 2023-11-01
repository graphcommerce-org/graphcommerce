import { Fab, FabProps, iconShoppingBag, iconCheckmark } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { SxProps, Theme } from '@mui/material'
import {
  useAddProductsToCartAction,
  UseAddProductsToCartActionProps,
} from './useAddProductsToCartAction'

export type AddProductsToCartFabProps = {
  sx?: SxProps<Theme>
  icon?: FabProps['icon']
} & Pick<FabProps, 'color' | 'size'> &
  UseAddProductsToCartActionProps

export function AddProductsToCartFab(props: AddProductsToCartFabProps) {
  const { icon = iconShoppingBag, product, sku, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)

  return (
    <Fab
      type='submit'
      {...rest}
      {...action}
      icon={showSuccess && !action.loading ? iconCheckmark : icon}
      aria-label={i18n._(/* i18n*/ `Add to Cart`)}
    />
  )
}
