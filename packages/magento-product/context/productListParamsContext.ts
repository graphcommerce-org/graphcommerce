'use client'

import React from 'react'
import { ProductListParams } from '../components/ProductListItems/filterTypes'

export const productListParamsContext = React.createContext<{
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
}>({ params: { filters: {}, sort: {}, url: '' }, setParams: () => {} })
