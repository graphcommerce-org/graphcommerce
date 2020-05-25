import React from 'react'
import { resourceUrl } from '@magento/venia-drivers'

import MiniCart from '@magento/venia-ui/lib/components/MiniCart'
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger'
import ProductFullDetail from '@magento/venia-ui/lib/components/ProductFullDetail'
import MagentoProvider from './MagentoProvider'
// import classes from './styles.module.css'

const MagentoDynamic = () => {
  return (
    <MagentoProvider>
      <CartTrigger />
      <MiniCart />

      <ProductFullDetail
        product={{
          id: 12,
          sku: 'hoi',

          price: {
            regularPrice: {
              amount: {
                currency: 'EUR',
                value: 12,
              },
            },
          },
          media_gallery_entries: [],
          description: 'Hallo',
        }}
      />
    </MagentoProvider>
  )
}

export default MagentoDynamic
