import { UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { ExtendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, useThemeProps } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  AddProductsToCartDocument,
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from './AddProductsToCart.gql'
import {
  AddProductsToCartSnackbar,
  AddProductsToCartSnackbarProps,
} from './AddProductsToCartSnackbar'
import { AddProductsToCartContext, RedirectType } from './useFormAddProductsToCart'

type AddProductsToCartFormProps = {
  // The props are actually used, but are passed through useThemeProps and that breaks react/no-unused-prop-types
  // eslint-disable-next-line react/no-unused-prop-types
  children: React.ReactNode
  // eslint-disable-next-line react/no-unused-prop-types
  sx?: SxProps<Theme>
  // eslint-disable-next-line react/no-unused-prop-types
  redirect?: RedirectType
} & UseFormGraphQlOptions<AddProductsToCartMutation, AddProductsToCartMutationVariables> &
  AddProductsToCartSnackbarProps

const name = 'AddProductsToCartForm'

/** Expose the component to be exendable in your theme.components */
declare module '@mui/material/styles/components' {
  interface Components {
    AddProductsToCartForm?: Pick<
      ExtendableComponent<Omit<AddProductsToCartFormProps, 'children'>>,
      'defaultProps'
    >
  }
}

/**
 * Component that handles adding products to the cart. Used on the product page, but can be used for
 * any product listing.
 *
 * Can be configured globally in your theme.ts;
 *
 * - Uses react-hook-form's useForm hook under the hood and exposes the form as a context which can be
 *   consumed with `useFormAddProductsToCart` hook.
 * - Cleans up the submitted data.
 * - Redirects the user to the cart/checkout/added page after successful submission.
 */
export function AddProductsToCartForm(props: AddProductsToCartFormProps) {
  const {
    children,
    redirect = 'cart',
    onComplete,
    sx,
    errorSnackbar,
    successSnackbar,
    ...formProps
  } = useThemeProps({ name, props })
  const router = useRouter()

  const form = useFormGqlMutationCart<
    AddProductsToCartMutation,
    AddProductsToCartMutationVariables
  >(AddProductsToCartDocument, {
    ...formProps,
    // We're stripping out incomplete entered options.
    onBeforeSubmit: async (variables) => {
      const variables2 = (await formProps.onBeforeSubmit?.(variables)) ?? variables
      if (variables2 === false) return false

      const { cartId, cartItems } = variables2
      return {
        cartId,
        cartItems: cartItems
          .filter((cartItem) => cartItem.sku)
          .map((cartItem) => ({
            ...cartItem,
            quantity: cartItem.quantity || 1,
            selected_options: cartItem.selected_options?.filter(Boolean),
            entered_options: cartItem.entered_options?.filter((option) => option?.value),
          })),
      }
    },
    onComplete: async (result, variables) => {
      await onComplete?.(result, variables)

      if (result.data?.addProductsToCart?.user_errors?.length || result.errors?.length || !redirect)
        return

      if (redirect === 'checkout') await router.push('/checkout')
      if (redirect === 'added') await router.push({ pathname: '/checkout/added' })
      if (redirect === 'cart') await router.push({ pathname: '/cart' })
    },
  })

  const submit = form.handleSubmit(() => {})

  return (
    <AddProductsToCartContext.Provider
      value={useMemo(() => ({ ...form, redirect }), [form, redirect])}
    >
      <Box component='form' onSubmit={submit} noValidate sx={sx} className={name}>
        {children}
      </Box>
      <AddProductsToCartSnackbar errorSnackbar={errorSnackbar} successSnackbar={successSnackbar} />
    </AddProductsToCartContext.Provider>
  )
}
