import {
  AddProductsToCartFab,
  ProductListItem,
  ProductListItemRenderer,
} from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from '@graphcommerce/magento-product-simple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { ProductReviewSummary } from '@graphcommerce/magento-review'
import { ProductWishlistChip } from '@graphcommerce/magento-wishlist'

export const productListRenderer: ProductListItemRenderer = {
  Skeleton: (props) => <ProductListItem {...props} aspectRatio={[1, 1]} />,
  SimpleProduct: (props) => {
    const { sku } = props
    return (
      <ProductListItemSimple
        {...props}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary {...props} />}
        topRight={<ProductWishlistChip {...props} />}
        bottomRight={<AddProductsToCartFab sku={sku} />}
      />
    )
  },
  ConfigurableProduct: (props) => (
    <ProductListItemConfigurable
      {...props}
      aspectRatio={[1, 1]}
      swatchLocations={{
        topLeft: [],
        topRight: [],
        bottomLeft: [],
        bottomRight: [],
      }}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  BundleProduct: (props) => (
    <ProductListItemBundle
      {...props}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  VirtualProduct: (props) => {
    const { sku } = props
    return (
      <ProductListItemVirtual
        {...props}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary {...props} />}
        topRight={<ProductWishlistChip {...props} />}
        bottomRight={<AddProductsToCartFab sku={sku} />}
      />
    )
  },
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip {...props} />}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} aspectRatio={[1, 1]} />
  // ),
}
