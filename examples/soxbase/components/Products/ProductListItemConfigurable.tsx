import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddConfigurableProductToCartDocument } from '@reachdigital/magento-product-configurable/AddConfigurableProductToCart.gql'
import ProductListItemConfigurableBase, {
  ActionsComponentProps,
  ProdustListItemConfigurableProps,
} from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import { SwatchLocationKeys } from '@reachdigital/magento-product/ProductListItem'

function AddToCartAction(props: ActionsComponentProps) {
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
        {...props}
        swatchLocations={swatchLocations}
        subTitle='By Soxbase'
        Actions={AddToCartAction}
      />
    </>
  )
}
