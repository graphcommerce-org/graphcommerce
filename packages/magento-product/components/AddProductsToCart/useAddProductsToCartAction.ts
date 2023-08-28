import { useFormState } from '@graphcommerce/ecommerce-ui'
import { useEventCallback } from '@mui/material'
import { useEffect, useState } from 'react'
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
  const {
    sku = props.product?.sku,
    product,
    index = 0,
    onClick: onClickIncoming,
    disabled,
    loading,
  } = props

  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const userErrors = toUserErrors(data)

  const submitSuccesful =
    !formState.isSubmitting && formState.isSubmitSuccessful && !error?.message && !userErrors.length

  useEffect(() => {
    if (submitSuccesful && submittedVariables?.cartItems.find((item) => item.sku === sku)) {
      setShowSuccess(true)
    }
  }, [sku, submitSuccesful, submittedVariables?.cartItems])

  if (showSuccess) {
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000)
  }

  useEffect(() => {
    console.log('SubmitSuccesful: ', submitSuccesful)
  }, [submitSuccesful])

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
    showSuccess,
  }
}
