import { useEventCallback } from '@mui/material'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type UseAddProductsToCartActionProps = {
  sku: string | null | undefined
  index?: number
  disabled?: boolean
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type UseAddProductsToCartActionReturn = {
  disabled: boolean
  loading: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  onMouseDown: React.MouseEventHandler<HTMLButtonElement>
}

export function useAddProductsToCartAction(
  props: UseAddProductsToCartActionProps,
): UseAddProductsToCartActionReturn {
  const { formState, setValue } = useFormAddProductsToCart()
  const { sku, index = 0, onClick: onClickIncomming, disabled, loading } = props

  return {
    disabled: Boolean(formState.errors.cartItems?.[index].sku?.message || disabled),
    loading: Boolean(formState.isSubmitting || loading),
    onClick: useEventCallback((e) => {
      if (formState.isSubmitting) return
      e.stopPropagation()
      if (process.env.NODE_ENV !== 'production') {
        if (!sku) console.warn('You must provide a SKU to AddProductsToCartFab')
      }
      if (sku) setValue(`cartItems.${index}.sku`, sku)
      onClickIncomming?.(e)
    }),
    onMouseDown: useEventCallback((e) => e.stopPropagation()),
  }
}
