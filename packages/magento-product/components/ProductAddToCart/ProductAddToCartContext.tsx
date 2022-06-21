import { createContext, useContext, useMemo } from 'react'
import {
  UseFormProductAddToCartReturn,
  UseFormProductAddToCartProps,
  useFormProductAddToCartBase,
} from './useFormProductAddToCartBase'

type ProductAddToCartContextType = UseFormProductAddToCartReturn & {
  urlKey: string
  sku: string
}

export const productAddToCartContext = createContext(
  undefined as unknown as ProductAddToCartContextType,
)

type ProductAddToCartContextProps = {
  children: React.ReactNode
  urlKey: string
  sku: string
} & UseFormProductAddToCartProps

export function ProductAddToCartContext(props: ProductAddToCartContextProps) {
  const { children, sku, urlKey, defaultValues, ...formProps } = props
  const form = useFormProductAddToCartBase({
    defaultValues: { ...defaultValues, sku },
    ...formProps,
  })

  const submit = form.handleSubmit(() => {})

  const value = useMemo(() => ({ ...form, sku, urlKey }), [form, sku, urlKey])

  return (
    <productAddToCartContext.Provider value={value}>
      <form onSubmit={submit} noValidate>
        {children}
      </form>
    </productAddToCartContext.Provider>
  )
}

export function useFormProductAddToCart() {
  return useContext(productAddToCartContext)
}
