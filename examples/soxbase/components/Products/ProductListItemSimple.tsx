import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import { AddSimpleProductToCartDocument } from '@reachdigital/magento-product-simple/AddSimpleProductToCart.gql'
import ProductListItemSimpleBase, {
  ProductListItemSimpleProps,
} from '@reachdigital/magento-product-simple/ProductListItemSimple'

export default function ProductListItemSimple(props: ProductListItemSimpleProps) {
  const { name, sku } = props
  return (
    <ProductListItemSimpleBase {...props} subTitle='By soxbase'>
      <AddToCartButton
        mutation={AddSimpleProductToCartDocument}
        variables={{ sku: sku ?? '' }}
        name={name}
      />
    </ProductListItemSimpleBase>
  )
}
