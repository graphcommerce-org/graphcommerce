import React, { useState, useContext } from 'react'
import { ProductListParams } from 'components/ProductList'

const context = React.createContext<{
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
}>({ params: { filters: {}, sort: {}, url: '' }, setParams: () => {} })

export const ProductListParamsProvider: React.FC<{ value: ProductListParams }> = ({
  children,
  value,
}) => {
  const [params, setParams] = useState<ProductListParams>(value)
  return <context.Provider value={{ params, setParams }}>{children}</context.Provider>
}

export const useProductListParamsContext = () => {
  return useContext(context)
}
