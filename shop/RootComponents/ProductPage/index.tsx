import React from 'react'
import dynamic from 'next/dynamic'
import { GetProductPageProps } from './getProductProps'

const MagentoDynamic = dynamic(() => import('../../MagentoDynamic'), { ssr: false })

const ProductPage: React.FC<GetProductPageProps> = ({ productDetail, children }) => {
  return <MagentoDynamic />
}

export default ProductPage
