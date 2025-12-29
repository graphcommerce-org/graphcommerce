import type { ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItem } from '@graphcommerce/magento-product'
import type { ProductListItemDownloadableFragment } from '../../graphql'

export type ProductListItemDownloadableProps = ProductListItemDownloadableFragment &
  ProductListItemProps

export function ProductListItemDownloadable(props: ProductListItemDownloadableProps) {
  return <ProductListItem {...props} />
}
