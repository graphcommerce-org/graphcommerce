import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddConfigurableProductToCartDocument } from '@reachdigital/magento-product-configurable/AddConfigurableProductToCart.gql'
import ProductListItemConfigurableBase, {
  ProductListItemConfigurableProps,
  ProdustListItemConfigurableProps,
} from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import { SwatchLocationKeys } from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import Subtitle from '../Subtitle'

function AddToCartAction(props: ProductListItemConfigurableProps) {
  const { variant, sku } = props
  return (
    <>
      {variant?.product?.sku && sku && (
        <AddToCartButton
          mutation={AddConfigurableProductToCartDocument}
          variables={{
            parentSku: sku,
            variantSku: variant.product.sku,
          }}
          name={variant.product.name}
        />
      )}
    </>
  )
}

export default function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const swatchLocations: Record<SwatchLocationKeys, string[]> = {
    topLeft: [],
    topRight: ['fashion_size'],
    bottomLeft: ['fashion_color'],
    bottomRight: [],
  }

  return (
    <>
      <ProductListItemConfigurableBase
        subTitle={<Subtitle value='By Soxbase' />}
        aspectRatio={[1, 1]}
        {...props}
        swatchLocations={swatchLocations}
        Actions={AddToCartAction}
      />
    </>
  )
}
