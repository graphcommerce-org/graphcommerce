import { useCartEnabled } from '@graphcommerce/magento-cart'
import type { ButtonProps } from '@graphcommerce/next-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import React from 'react'
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

export const AddProductsToCartButton = React.forwardRef<
  HTMLButtonElement,
  AddProductsToCartButtonProps
>((props, ref) => {
  const { children, product, disabled, ...rest } = props
  const { showSuccess, ...action } = useAddProductsToCartAction(props)
  const cartEnabled = useCartEnabled()

  if (!cartEnabled) return null

  return (
    <Button
      ref={ref}
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
})
