import { Button, ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import {
  useAddProductsToCartAction,
  UseAddProductsToCartActionProps,
} from './useAddProductsToCartAction'

export type AddProductsToCartButtonProps = UseAddProductsToCartActionProps &
  Pick<
    ButtonProps<'button'>,
    | 'variant'
    | 'color'
    | 'size'
    | 'fullWidth'
    | 'startIcon'
    | 'endIcon'
    | 'onClick'
    | 'sx'
    | 'children'
  >

export function AddProductsToCartButton(props: AddProductsToCartButtonProps) {
  const { children, product, ...rest } = props
  const action = useAddProductsToCartAction(props)

  return (
    <Button type='submit' color='primary' variant='pill' size='large' {...rest} {...action}>
      {children || <Trans id='Add to Cart' />}
    </Button>
  )
}
