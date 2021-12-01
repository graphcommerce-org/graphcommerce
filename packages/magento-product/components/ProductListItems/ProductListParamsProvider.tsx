import { PropsWithChildren, useState, useEffect, useMemo } from 'react'
import { productListParamsContext } from '../../context/productListParamsContext'
import { ProductListParams } from './filterTypes'

export default function ProductListParamsProvider({
  children,
  value,
}: PropsWithChildren<{ value: ProductListParams }>) {
  const [params, setParams] = useState<ProductListParams>(value)

  useEffect(() => setParams(value), [value])

  const prov = useMemo(() => ({ params, setParams }), [params])

  return (
    <productListParamsContext.Provider value={prov}>{children}</productListParamsContext.Provider>
  )
}
