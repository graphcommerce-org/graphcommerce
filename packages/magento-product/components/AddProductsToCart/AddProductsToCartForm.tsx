import { UseFormGqlMutationReturn, UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Box, SxProps, Theme } from '@mui/material'
import { createContext, useContext, useMemo } from 'react'
import {
  AddProductsToCartDocument,
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from './AddProductsToCart.gql'

type AddProductsToCartContextType<T extends Record<string, unknown>> = UseFormGqlMutationReturn<
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables
> & {
  urlKey: string
  sku: string
  typeProduct?: T
}

export const addProductsToCartContext = createContext(
  undefined as AddProductsToCartContextType<Record<'unknown', unknown>> | undefined,
)

type AddProductsToCartFormProps<TypeProduct extends Record<string, unknown>> = {
  children: React.ReactNode
  urlKey: string
  sku: string
  typeProduct?: TypeProduct
  sx?: SxProps<Theme>
} & Omit<
  UseFormGraphQlOptions<AddProductsToCartMutation, AddProductsToCartMutationVariables>,
  'onBeforeSubmit'
>

export function AddProductsToCartForm<TypeProduct extends Record<string, unknown>>(
  props: AddProductsToCartFormProps<TypeProduct>,
) {
  const { children, sku, urlKey, defaultValues, typeProduct, sx, ...formProps } = props
  const form = useFormGqlMutationCart(AddProductsToCartDocument, {
    defaultValues: { ...defaultValues, cartItems: [{ sku, quantity: 1 }] },
    ...formProps,
  })

  const submit = form.handleSubmit(() => {})

  const value = useMemo(
    () => ({ ...form, sku, urlKey, typeProduct }),
    [form, sku, urlKey, typeProduct],
  )

  return (
    <addProductsToCartContext.Provider value={value}>
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        {children}
      </Box>
    </addProductsToCartContext.Provider>
  )
}

export function useFormAddProductsToCart<TypeProduct extends Record<string, unknown>>(
  optional: true,
): AddProductsToCartContextType<TypeProduct> | undefined
export function useFormAddProductsToCart<TypeProduct extends Record<string, unknown>>(
  optional?: false,
): AddProductsToCartContextType<TypeProduct>
export function useFormAddProductsToCart(optional = false) {
  const context = useContext(addProductsToCartContext)

  if (!optional && typeof context === 'undefined') {
    throw Error(
      'useFormAddProductsToCart must be used within a AddProductsToCartForm or provide the optional=true option',
    )
  }
  return context
}
