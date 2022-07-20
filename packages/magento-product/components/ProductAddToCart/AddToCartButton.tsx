import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { useFormProductAddToCart } from './ProductAddToCartForm'

type AddToCartButtonProps = {
  sx?: SxProps<Theme>
}

export function AddToCartButton(props: AddToCartButtonProps) {
  const { sx } = props
  const { formState } = useFormProductAddToCart()

  return (
    <Button
      type='submit'
      loading={formState.isSubmitting}
      color='primary'
      variant='pill'
      size='large'
      sx={sx}
    >
      <Trans id='Add to Cart' />
    </Button>
  )
}
