import { useState, useEffect, useMemo } from 'react'
import { productListParamsContext } from '../../context/productListParamsContext'
import type { ProductListParams } from './filterTypes'

export function ProductListParamsProvider({
  children,
  value,
}: {
  value: ProductListParams
  children: React.ReactNode
}) {
  const [params, setParams] = useState<ProductListParams>(value)

  useEffect(() => setParams(value), [value])

  const prov = useMemo(() => ({ params, setParams }), [params])

  return (
    <productListParamsContext.Provider value={prov}>{children}</productListParamsContext.Provider>
  )
}
