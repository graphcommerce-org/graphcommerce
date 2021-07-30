import { useContext } from 'react'
import { productListParamsContext } from '../context/productListParamsContext'

export const useProductListParamsContext = () => useContext(productListParamsContext)
