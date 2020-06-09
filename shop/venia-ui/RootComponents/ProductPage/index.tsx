import React from 'react'
import MagentoDynamic from 'shop/venia-ui/MagentoDynamic/MagentoDynamic'
import Head from 'next/head'
import { GetProductPageProps } from './getProductProps'

/**
 * Replaces RootComponents/Product
 * https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/RootComponents/Product/product.js
 */
const ProductPage: React.FC<GetProductPageProps> = ({ product }) => {
  const { meta_title, meta_description } = product
  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name='description' content={meta_description} />
        <meta name='robots' content='INDEX, FOLLOW' />
      </Head>
      <MagentoDynamic
        loader={() => import('@magento/venia-ui/lib/components/ProductFullDetail')}
        skeleton={(ref) => <div ref={ref}>hoi</div>}
        product={product}
      />
    </>
  )
}

export default ProductPage
