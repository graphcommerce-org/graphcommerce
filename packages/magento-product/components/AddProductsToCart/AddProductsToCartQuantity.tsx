import { NumberFieldElement, NumberFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { i18n } from '@lingui/core'
import { AddProductsToCartMutationVariables } from './AddProductsToCart.gql'
import { AddToCartItemSelector, useFormAddProductsToCart } from './useFormAddProductsToCart'

type AddToCartQuantityProps = Omit<
  NumberFieldElementProps<AddProductsToCartMutationVariables>,
  'error' | 'required' | 'inputProps' | 'helperText' | 'name' | 'control'
> &
  AddToCartItemSelector

export function AddProductsToCartQuantity(props: AddToCartQuantityProps) {
  const { index = 0 } = props
  const { control } = useFormAddProductsToCart()

  return (
    <NumberFieldElement
      variant='outlined'
      size='small'
      color='primary'
      {...props}
      required
      min={1}
      slotProps={{ htmlInput: { 'aria-label': i18n._(/* i18n */ 'Add to cart quantity') } }}
      defaultValue={1}
      control={control}
      aria-label={i18n._(/* i18n */ 'Add to cart quantity')}
      name={`cartItems.${index}.quantity`}
    />
  )
}
