import { ProductListParams } from '@reachdigital/magento-product'
import React, { useState, useContext, useEffect, PropsWithChildren } from 'react'

const context = React.createContext<{
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
}>({ params: { filters: {}, sort: {}, url: '' }, setParams: () => {} })

export function ProductListParamsProvider({
  children,
  value,
}: PropsWithChildren<{ value: ProductListParams }>) {
  const [params, setParams] = useState<ProductListParams>(value)

  useEffect(() => {
    setParams(value)
  }, [value])

  return <context.Provider value={{ params, setParams }}>{children}</context.Provider>
}

export const useProductListParamsContext = () => useContext(context)
