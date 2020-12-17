import { ProductListParams } from '@reachdigital/magento-product/ProductListItems/filterTypes'
import { useRouter } from 'next/router'
import React, { useState, useContext, useEffect } from 'react'

const context = React.createContext<{
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
}>({ params: { filters: {}, sort: {}, url: '' }, setParams: () => {} })

export const ProductListParamsProvider: React.FC<{ value: ProductListParams }> = ({
  children,
  value,
}) => {
  const [params, setParams] = useState<ProductListParams>(value)
  const router = useRouter()

  const updateParams = () => setParams(value)
  useEffect(() => {
    router.events.on('routeChangeComplete', updateParams)
    return () => router.events.off('routeChangeComplete', updateParams)
  })

  return <context.Provider value={{ params, setParams }}>{children}</context.Provider>
}

export const useProductListParamsContext = () => useContext(context)
