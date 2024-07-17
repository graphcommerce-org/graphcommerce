import { useFormState } from '@graphcommerce/ecommerce-ui'
import { useEventCallback } from '@mui/material'
import { startTransition, useEffect, useState } from 'react'
import { UseAddProductsToCartActionFragment } from './UseAddProductsToCartAction.gql'
import { toUserErrors } from './toUserErrors'
import { AddToCartItemSelector, useFormAddProductsToCart } from './useFormAddProductsToCart'

export type UseAddProductsToCartActionProps = AddToCartItemSelector & {
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
  showSuccess: boolean
}

export function useAddProductsToCartAction(
  props: UseAddProductsToCartActionProps,
): UseAddProductsToCartActionReturn {
  const { setValue, getValues, control, error, data, submittedVariables } =
    useFormAddProductsToCart()
  const formState = useFormState({ control })
  const { sku = props.product?.sku, product, index = 0, onClick: onClickIncoming, disabled } = props

  const loading = formState.isSubmitting && getValues(`cartItems.${index}.sku`) === sku

  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const userErrors = toUserErrors(data)

  const submitSuccesful =
    !formState.isSubmitting && formState.isSubmitSuccessful && !error?.message && !userErrors.length

  useEffect(() => {
    if (submitSuccesful && submittedVariables?.cartItems.find((item) => item.sku === sku)) {
      setShowSuccess(true)
    }
  }, [sku, submitSuccesful, submittedVariables?.cartItems])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [showSuccess, loading])

  return {
    disabled:
      product?.stock_status === 'OUT_OF_STOCK' ||
      Boolean(formState.errors.cartItems?.[index]?.sku?.message || disabled),
    loading,
    onClick: useEventCallback((e) => {
      e.stopPropagation()
      if (formState.isSubmitting) return
      if (process.env.NODE_ENV !== 'production') {
        if (!sku) console.warn(`You must provide a 'sku' to useAddProductsToCartAction`)
      }
      // TODO should be removed, setting the form value on submission isn't a great idea.
      if (!getValues(`cartItems.${index}.sku`)) setValue(`cartItems.${index}.sku`, sku ?? '')
      startTransition(() => {
        onClickIncoming?.(e)
      })
    }),
    onMouseDown: useEventCallback((e) => e.stopPropagation()),
    showSuccess,
  }
}
