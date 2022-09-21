import { Button, ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { useFormAddProductsToCart } from './AddProductsToCartForm'

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
  const { loading, sku, index = 0 } = props

  return (
    <Button
      type='submit'
      color='primary'
      variant='pill'
      size='large'
      {...props}
      disabled={Boolean(formState.errors.cartItems?.[index].sku?.message)}
      loading={formState.isSubmitting || loading}
      onClick={() => setValue(`cartItems.${index}.sku`, sku)}
    >
      <Trans id='Add to Cart' />
    </Button>
  )
}
