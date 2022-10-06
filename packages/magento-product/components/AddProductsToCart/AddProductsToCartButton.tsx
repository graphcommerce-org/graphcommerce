import { Button, ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme, useEventCallback } from '@mui/material'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type AddProductsToCartButtonProps = {
  sx?: SxProps<Theme>
  sku: string
  index?: number
} & Pick<
  ButtonProps<'button'>,
  | 'variant'
  | 'color'
  | 'size'
  | 'disabled'
  | 'fullWidth'
  | 'startIcon'
  | 'endIcon'
  | 'onClick'
  | 'loading'
>

export function AddProductsToCartButton(props: AddProductsToCartButtonProps) {
  const { formState, setValue } = useFormAddProductsToCart()
  const { loading, sku, index = 0, disabled, onClick } = props

  const clickHandler: NonNullable<AddProductsToCartButtonProps['onClick']> = useEventCallback(
    (e) => {
      setValue(`cartItems.${index}.sku`, sku)
      onClick?.(e)
    },
  )

  return (
    <Button
      type='submit'
      color='primary'
      variant='pill'
      size='large'
      {...props}
      disabled={Boolean(formState.errors.cartItems?.[index].sku?.message) || disabled}
      loading={formState.isSubmitting || loading}
      onClick={clickHandler}
    >
      <Trans id='Add to Cart' />
    </Button>
  )
}
