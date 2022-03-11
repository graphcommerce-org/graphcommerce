import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItemDownloadableFragment } from './ProductListItemDownloadable.gql'

export type ProductListItemDownloadableProps = ProductListItemDownloadableFragment &
  ProductListItemProps

export function ProductListItemDownloadable(props: ProductListItemDownloadableProps) {
  return <ProductListItem {...props} />
}
