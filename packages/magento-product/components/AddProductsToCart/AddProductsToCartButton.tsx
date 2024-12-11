import { useCartEnabled } from '@graphcommerce/magento-cart'
import type { ButtonProps } from '@graphcommerce/next-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { UseAddProductsToCartActionProps } from './useAddProductsToCartAction'
import { useAddProductsToCartAction } from './useAddProductsToCartAction'

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
    | 'type'
  >

export function AddProductsToCartButton(props: AddProductsToCartButtonProps) {
  const { children, product, disabled, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)
  const cartEnabled = useCartEnabled()

  if (!cartEnabled) return null

  return (
    <Button
      type='submit'
      color='primary'
      variant='pill'
      size='large'
      {...rest}
      {...action}
      disabled={disabled}
    >
      {children || <Trans>Add to Cart</Trans>}
    </Button>
  )
}
