import { UseFormGqlMutationReturn, UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo } from 'react'
import {
  AddProductsToCartDocument,
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from './AddProductsToCart.gql'

type RedirectType = 'summary' | 'cart' | 'checkout' | undefined

type AddProductsToCartFormState = AddProductsToCartMutationVariables & {
  redirect?: RedirectType
}

type AddProductsToCartContextType = UseFormGqlMutationReturn<
  AddProductsToCartMutation,
  AddProductsToCartFormState
>

export const addProductsToCartContext = createContext(
  undefined as AddProductsToCartContextType | undefined,
)

type AddProductsToCartFormProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  redirect?: RedirectType
} & Omit<
  UseFormGraphQlOptions<AddProductsToCartMutation, AddProductsToCartFormState>,
  'onBeforeSubmit'
>

export function AddProductsToCartForm(props: AddProductsToCartFormProps) {
  const { children, defaultValues, redirect, onComplete, sx, ...formProps } = props
  const router = useRouter()

  const form = useFormGqlMutationCart<AddProductsToCartMutation, AddProductsToCartFormState>(
    AddProductsToCartDocument,
    {
      defaultValues: {
        ...defaultValues,
        redirect,
      },

      // We're stripping out incomplete entered options.
      onBeforeSubmit: ({ cartId, cartItems }) => ({
        cartId,
        cartItems: cartItems
          .filter((cartItem) => cartItem.sku)
          .map((cartItem) => ({
            ...cartItem,
            selected_options: cartItem.selected_options?.filter(Boolean),
            entered_options: cartItem.entered_options?.filter((option) => option?.value),
          })),
      }),
      onComplete: async (result, variables) => {
        await onComplete?.(result, variables)

        if (
          result.data?.addProductsToCart?.user_errors?.length ||
          result.errors?.length ||
          !redirect
        )
          return

        if (redirect === 'checkout') await router.push('/checkout')

        await router.push({
          pathname: '/cart',
          query: {
            summary: redirect === 'summary' ? '1' : undefined,
            added: variables.cartItems.map((i) => i.sku),
          },
        })
      },
      ...formProps,
    },
  )

  // When the value changes, update the value in the form
  useEffect(() => {
    if (form.getValues('redirect') !== redirect) form.setValue('redirect', redirect)
  }, [form, redirect])

  const submit = form.handleSubmit(() => {})

  return (
    <addProductsToCartContext.Provider value={form}>
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        {children}
      </Box>
    </addProductsToCartContext.Provider>
  )
}

export function useFormAddProductsToCart(optional: true): AddProductsToCartContextType | undefined
export function useFormAddProductsToCart(optional?: false): AddProductsToCartContextType
export function useFormAddProductsToCart(optional = false) {
  const context = useContext(addProductsToCartContext)

  if (!optional && typeof context === 'undefined') {
    throw Error(
      'useFormAddProductsToCart must be used within a AddProductsToCartForm or provide the optional=true argument',
    )
  }
  return context
}
