import { Fab, FabProps, iconShoppingBag } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material/styles'
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
  const { icon = iconShoppingBag } = props
  const action = useAddProductsToCartAction(props)
  return <Fab type='submit' {...props} {...action} icon={icon} />
}
