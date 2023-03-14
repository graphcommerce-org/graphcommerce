import { useFormState } from '@graphcommerce/ecommerce-ui'
import { useEventCallback } from '@mui/material/utils'
import { UseAddProductsToCartActionFragment } from './UseAddProductsToCartAction.gql'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type UseAddProductsToCartActionProps = {
  index?: number
  disabled?: boolean
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  sku?: string | null | undefined
  product?: UseAddProductsToCartActionFragment
} & ({ sku: string | null | undefined } | { product: UseAddProductsToCartActionFragment })

export type UseAddProductsToCartActionReturn = {
  disabled: boolean
  loading: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>
}

export function useAddProductsToCartAction(
  props: UseAddProductsToCartActionProps,
): UseAddProductsToCartActionReturn {
  const { setValue, getValues, control } = useFormAddProductsToCart()
  const formState = useFormState({ control })
  const {
    sku = props.product?.sku,
    product,
    index = 0,
    onClick: onClickIncoming,
    disabled,
    loading,
  } = props

  return {
    disabled:
      product?.stock_status === 'OUT_OF_STOCK' ||
      Boolean(formState.errors.cartItems?.[index]?.sku?.message || disabled),
    loading: loading || (formState.isSubmitting && getValues(`cartItems.${index}.sku`) === sku),
    onClick: useEventCallback((e) => {
      e.stopPropagation()
      if (formState.isSubmitting) return
      if (process.env.NODE_ENV !== 'production') {
        if (!sku) console.warn(`You must provide a 'sku' to useAddProductsToCartAction`)
      }
      setValue(`cartItems.${index}.sku`, sku ?? '')
      onClickIncoming?.(e)
    }),
    onMouseDown: useEventCallback((e) => e.stopPropagation()),
  }
}
