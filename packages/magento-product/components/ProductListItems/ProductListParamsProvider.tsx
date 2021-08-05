import { PropsWithChildren, useState, useEffect } from 'react'
import { productListParamsContext } from '../../context/productListParamsContext'
import { ProductListParams } from './filterTypes'

export default function ProductListParamsProvider({
  children,
  value,
}: PropsWithChildren<{ value: ProductListParams }>) {
  const [params, setParams] = useState<ProductListParams>(value)

  useEffect(() => {
    setParams(value)
  }, [value])

  return (
    <productListParamsContext.Provider value={{ params, setParams }}>
      {children}
    </productListParamsContext.Provider>
  )
}
