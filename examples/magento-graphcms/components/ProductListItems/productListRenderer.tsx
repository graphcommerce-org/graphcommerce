import { AddProductsToCartFab, ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from '@graphcommerce/magento-product-simple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { ProductReviewSummary } from '@graphcommerce/magento-review'
import { ProductWishlistChip } from '@graphcommerce/magento-wishlist'

export const productListRenderer: ProductListItemRenderer = {
  SimpleProduct: (props) => {
    const { sku } = props
    return (
      <ProductListItemSimple
        {...props}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary {...props} />}
        topRight={<ProductWishlistChip product={props} />}
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
      topRight={<ProductWishlistChip product={props} />}
    />
  ),
  BundleProduct: (props) => (
    <ProductListItemBundle
      {...props}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip product={props} />}
    />
  ),
  VirtualProduct: (props) => {
    const { sku } = props
    return (
      <ProductListItemVirtual
        {...props}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary {...props} />}
        topRight={<ProductWishlistChip product={props} />}
        bottomRight={<AddProductsToCartFab sku={sku} />}
      />
    )
  },
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip product={props} />}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip product={props} />}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} aspectRatio={[1, 1]} />
  // ),
}
