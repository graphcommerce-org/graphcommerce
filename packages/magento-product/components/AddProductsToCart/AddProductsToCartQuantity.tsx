import type { NumberFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { NumberFieldElement } from '@graphcommerce/ecommerce-ui'
import { i18n } from '@lingui/core'
import type { AddProductsToCartMutationVariables } from './AddProductsToCart.gql'
import type { AddToCartItemSelector } from './useFormAddProductsToCart'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type AddToCartQuantityProps = Omit<
  NumberFieldElementProps<AddProductsToCartMutationVariables>,
  'error' | 'required' | 'helperText' | 'name' | 'control' | 'rules'
> &
  AddToCartItemSelector

export function AddProductsToCartQuantity(props: AddToCartQuantityProps) {
  const { index = 0, inputProps, ...rest } = props
  const { control } = useFormAddProductsToCart()

  return (
    <NumberFieldElement
      variant='outlined'
      size='small'
      color='primary'
      required
      inputProps={{
        min: 1,
        'aria-label': i18n._(/* i18n */ 'Add to cart quantity'),
        ...inputProps,
      }}
      defaultValue={1}
      control={control}
      aria-label={i18n._(/* i18n */ 'Add to cart quantity')}
      name={`cartItems.${index}.quantity`}
      {...rest}
    />
  )
}
