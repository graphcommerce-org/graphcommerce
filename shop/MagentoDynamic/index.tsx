import React from 'react'
import MiniCart from '@magento/venia-ui/lib/components/MiniCart'
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger'
import ProductFullDetail from '@magento/venia-ui/lib/components/ProductFullDetail'
import MagentoProvider from './App'
// import classes from './styles.module.css'

const MagentoDynamic = () => {
  return (
    <MagentoProvider>
      <MiniCart />

      <ProductFullDetail
        product={{
          id: 12,
          sku: 'hoi',
          price: {
            regularPrice: {},
          },
          media_gallery_entries: [],
          description: 'Hallo',
        }}
      />
    </MagentoProvider>
  )
}

export default MagentoDynamic
