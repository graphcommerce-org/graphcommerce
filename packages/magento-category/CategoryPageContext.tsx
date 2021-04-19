import { ProductListParams } from '@reachdigital/magento-product/ProductListItems/filterTypes'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  useEffect(() => {
    const updateParams = () => setParams(value)
    router.events.on('routeChangeComplete', updateParams)
    return () => router.events.off('routeChangeComplete', updateParams)
  }, [router.events, value])

  return <context.Provider value={{ params, setParams }}>{children}</context.Provider>
}

export const useProductListParamsContext = () => useContext(context)
