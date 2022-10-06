import { iconCartAdd, Fab, FabProps } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import {
  useAddProductsToCartAction,
  UseAddProductsToCartActionProps,
} from './useAddProductsToCartAction'

export type AddProductsToCartFabProps = {
  sx?: SxProps<Theme>
} & Pick<FabProps, 'color' | 'size'> &
  UseAddProductsToCartActionProps

export function AddProductsToCartFab(props: AddProductsToCartFabProps) {
  const action = useAddProductsToCartAction(props)
  return <Fab type='submit' {...props} {...action} sx={{ display: 'grid' }} icon={iconCartAdd} />
}
