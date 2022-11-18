import { useEventCallback } from '@mui/material'
import { useMemo } from 'react'
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
  const { formState, setValue, getValues } = useFormAddProductsToCart()
  const { sku, index = 0, onClick: onClickIncomming, disabled, loading } = props

  return {
    disabled: Boolean(formState.errors.cartItems?.[index]?.sku?.message || disabled),
    loading: loading || (formState.isSubmitting && getValues(`cartItems.${index}.sku`) === sku),
    onClick: useEventCallback((e) => {
      e.stopPropagation()
      if (formState.isSubmitting) return
      if (process.env.NODE_ENV !== 'production') {
        if (!sku) console.warn(`You must provide a 'sku' to useAddProductsToCartAction`)
      }
      setValue(`cartItems.${index}.sku`, sku ?? '')
      onClickIncomming?.(e)
    }),
    onMouseDown: useEventCallback((e) => e.stopPropagation()),
  }
}
