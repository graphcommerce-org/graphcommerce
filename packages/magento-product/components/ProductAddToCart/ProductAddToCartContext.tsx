import { createContext, useContext, useMemo } from 'react'
import {
  UseFormProductAddToCartReturn,
  UseFormProductAddToCartProps,
  useFormProductAddToCartBase,
} from './useFormProductAddToCartBase'

type ProductAddToCartContextType<T extends Record<string, unknown>> =
  UseFormProductAddToCartReturn & {
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
} & UseFormProductAddToCartProps

export function ProductAddToCartContext<TypeProduct extends Record<string, unknown>>(
  props: ProductAddToCartContextProps<TypeProduct>,
) {
  const { children, sku, urlKey, defaultValues, typeProduct, ...formProps } = props
  const form = useFormProductAddToCartBase({
    defaultValues: { ...defaultValues, sku },
    ...formProps,
  })

  const submit = form.handleSubmit(() => {})

  const value = useMemo(
    () => ({ ...form, sku, urlKey, typeProduct }),
    [form, sku, urlKey, typeProduct],
  )

  return (
    <productAddToCartContext.Provider value={value}>
      <form onSubmit={submit} noValidate>
        {children}
      </form>
    </productAddToCartContext.Provider>
  )
}

export function useFormProductAddToCart<TypeProduct extends Record<string, unknown>>() {
  return useContext(productAddToCartContext) as ProductAddToCartContextType<TypeProduct>
}
