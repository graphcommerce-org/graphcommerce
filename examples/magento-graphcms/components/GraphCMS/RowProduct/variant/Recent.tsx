import { RecentlyViewedProducts } from '@graphcommerce/magento-recently-viewed-products'
import { productListRenderer } from '../../../ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'

type RecentProps = RowProductFragment & { sku?: string | null | undefined }

export function Recent({ title, sku }: RecentProps) {
  return (
    <RecentlyViewedProducts
      title={title}
      exclude={sku ? [sku] : []}
      productListRenderer={productListRenderer}
    />
  )
}
