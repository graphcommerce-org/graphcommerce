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
  > & {
    forwardedRef?: React.Ref<HTMLButtonElement>
  }

export function AddProductsToCartButton(props: AddProductsToCartButtonProps) {
  const { children, product, forwardedRef, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)
  const action = useAddProductsToCartAction(props)

  return (
    <Button
      ref={forwardedRef}
      type='submit'
      color='primary'
      variant='pill'
      size='large'
      {...rest}
      {...action}
    >
      {children || <Trans id='Add to Cart' />}
    </Button>
  )
}
