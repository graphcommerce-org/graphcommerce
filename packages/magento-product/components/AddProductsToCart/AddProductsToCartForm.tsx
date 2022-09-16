import { UseFormGqlMutationReturn, UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Box, SxProps, Theme } from '@mui/material'
import { createContext, useContext, useMemo } from 'react'
import {
  AddProductsToCartDocument,
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from './AddProductsToCart.gql'

type AddProductsToCartContextType = UseFormGqlMutationReturn<
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables
> & {
  urlKey: string
  sku: string
}

export const addProductsToCartContext = createContext(
  undefined as AddProductsToCartContextType | undefined,
)

type AddProductsToCartFormProps = {
  children: React.ReactNode
  urlKey: string
  sku: string
  sx?: SxProps<Theme>
} & Omit<
  UseFormGraphQlOptions<AddProductsToCartMutation, AddProductsToCartMutationVariables>,
  'onBeforeSubmit'
>

export function AddProductsToCartForm(props: AddProductsToCartFormProps) {
  const { children, sku, urlKey, defaultValues, sx, ...formProps } = props
  const form = useFormGqlMutationCart(AddProductsToCartDocument, {
    defaultValues: { ...defaultValues, cartItems: [{ sku, quantity: 1 }] },

    // We're stripping out incomplete entered options.
    onBeforeSubmit: ({ cartId, cartItems }) => ({
      cartId,
      cartItems: cartItems.map((cartItem) => ({
        ...cartItem,
        selected_options: cartItem.selected_options?.filter(Boolean),
        entered_options: cartItem.entered_options?.filter((option) => option?.value),
      })),
    }),
    ...formProps,
  })

  const submit = form.handleSubmit(() => {})

  const value = useMemo(() => ({ ...form, sku, urlKey }), [form, sku, urlKey])

  return (
    <addProductsToCartContext.Provider value={value}>
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
