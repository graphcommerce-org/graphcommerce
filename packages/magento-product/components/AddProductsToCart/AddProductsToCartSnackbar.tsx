import { useFormState } from '@graphcommerce/ecommerce-ui'
import { ErrorSnackbarProps, MessageSnackbarProps, nonNullable } from '@graphcommerce/next-ui'
import { useMemo } from 'react'
import { AddProductsToCartSnackbarMessage } from './AddProductsToCartSnackbarMessage'
import { findAddedItems } from './findAddedItems'
import { toUserErrors } from './toUserErrors'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type AddProductsToCartSnackbarProps = {
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
  disableSuccessSnackbar?: boolean
}

export function AddProductsToCartSnackbar(props: AddProductsToCartSnackbarProps) {
  const { errorSnackbar, successSnackbar, disableSuccessSnackbar } = props
  const { error, data, redirect, control, submittedVariables } = useFormAddProductsToCart()

  const formState = useFormState({ control })

  const userErrors = toUserErrors(data)

  const showSuccess =
    !disableSuccessSnackbar &&
    !formState.isSubmitting &&
    formState.isSubmitSuccessful &&
    !error?.message &&
    !userErrors.length &&
    !redirect

  const addedItems = useMemo(
    () => findAddedItems(data, submittedVariables),
    [data, submittedVariables],
  )

  return (
    <AddProductsToCartSnackbarMessage
      error={!formState.isSubmitting ? error : undefined}
      showSuccess={showSuccess}
      userErrors={data?.addProductsToCart?.user_errors.filter(nonNullable)}
      addedItems={addedItems.map((item) => item.itemInCart?.product.name).filter(nonNullable)}
      errorSnackbar={errorSnackbar}
      successSnackbar={successSnackbar}
    />
  )
}
