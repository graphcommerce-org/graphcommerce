import { UseFormGqlMutationReturn, UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Box, SxProps, Theme } from '@mui/material'
import { createContext, useContext, useMemo } from 'react'
import {
  ProductAddToCartDocument,
  ProductAddToCartMutation,
  ProductAddToCartMutationVariables,
} from './ProductAddToCart.gql'

type ProductAddToCartContextType<T extends Record<string, unknown>> = UseFormGqlMutationReturn<
  ProductAddToCartMutation,
  ProductAddToCartMutationVariables
> & {
  urlKey: string
  sku: string
  typeProduct?: T
}

export const productAddToCartContext = createContext(
  undefined as ProductAddToCartContextType<Record<'unknown', unknown>> | undefined,
)

type ProductAddToCartContextProps<TypeProduct extends Record<string, unknown>> = {
  children: React.ReactNode
  urlKey: string
  sku: string
  typeProduct?: TypeProduct
  sx?: SxProps<Theme>
} & Omit<
  UseFormGraphQlOptions<ProductAddToCartMutation, ProductAddToCartMutationVariables>,
  'onBeforeSubmit'
>

export function ProductAddToCartForm<TypeProduct extends Record<string, unknown>>(
  props: ProductAddToCartContextProps<TypeProduct>,
) {
  const { children, sku, urlKey, defaultValues, typeProduct, sx, ...formProps } = props
  const form = useFormGqlMutationCart(ProductAddToCartDocument, {
    defaultValues: { ...defaultValues, sku, quantity: 1 },
    ...formProps,
  })

  const submit = form.handleSubmit(() => {})

  const value = useMemo(
    () => ({ ...form, sku, urlKey, typeProduct }),
    [form, sku, urlKey, typeProduct],
  )

  return (
    <productAddToCartContext.Provider value={value}>
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        {children}
      </Box>
    </productAddToCartContext.Provider>
  )
}

export function useFormProductAddToCart<TypeProduct extends Record<string, unknown>>(
  optional: true,
): ProductAddToCartContextType<TypeProduct> | undefined
export function useFormProductAddToCart<TypeProduct extends Record<string, unknown>>(
  optional?: false,
): ProductAddToCartContextType<TypeProduct>
export function useFormProductAddToCart(optional = false) {
  const context = useContext(productAddToCartContext)

  if (!optional && typeof context === 'undefined') {
    throw Error(
      'useFormProductAddToCart must be used within a ProductAddToCartForm or provide the optional=true option',
    )
  }
  return context
}
