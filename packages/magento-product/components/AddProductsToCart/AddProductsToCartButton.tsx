import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { ButtonProps, SxProps, Theme } from '@mui/material'
import { useFormAddProductsToCart } from './AddProductsToCartForm'

export type AddProductsToCartButtonProps = {
  sx?: SxProps<Theme>
} & Pick<
  ButtonProps<'button'>,
  'variant' | 'color' | 'size' | 'disabled' | 'fullWidth' | 'startIcon' | 'endIcon' | 'onClick'
>

export function AddProductsToCartButton(props: AddProductsToCartButtonProps) {
  const { formState } = useFormAddProductsToCart()

  return (
    <Button
      type='submit'
      loading={formState.isSubmitting}
      color='primary'
      variant='pill'
      size='large'
      {...props}
    >
      <Trans id='Add to Cart' />
    </Button>
  )
}
