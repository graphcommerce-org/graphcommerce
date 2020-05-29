import React from 'react'
import dynamic from 'next/dynamic'
import { GetProductPageProps } from './getProductProps'

const ProductPage: React.FC<GetProductPageProps> = ({ productDetail, children }) => {
  return <div>Product details</div>
}

export default ProductPage
