import React from 'react'
import { GetProductPageProps } from './getProductProps'

const ProductPage: React.FC<GetProductPageProps> = ({ product }) => {
  const { name } = product
  return <div>Product {name}</div>
}

export default ProductPage
