import { TextInputNumber, TextInputNumberProps } from '@graphcommerce/next-ui'
import { useFormProductAddToCart } from './ProductAddToCartForm'

type AddToCartQuantityProps = Omit<
  TextInputNumberProps,
  'error' | 'required' | 'inputProps' | 'inputRef' | 'helperText' | 'disabled'
>

export function AddToCartQuantity(props: AddToCartQuantityProps) {
  const form = useFormProductAddToCart()
  const { formState, muiRegister, required } = form

  return (
    <TextInputNumber
      variant='outlined'
      size='small'
      {...props}
      error={formState.isSubmitted && !!formState.errors.quantity}
      required={required.quantity}
      inputProps={{ min: 1 }}
      {...muiRegister('quantity', { required: required.quantity })}
      helperText={formState.isSubmitted && formState.errors.quantity?.message}
      disabled={formState.isSubmitting}
    />
  )
}
