import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItemBundleFragment } from './ProductListItemBundle.gql'

export type ProdustListItemBundleProps = ProductListItemBundleFragment & ProductListItemProps

export function ProductListItemBundle(props: ProdustListItemBundleProps) {
  const { children } = props

  return <ProductListItem {...props}>{children}</ProductListItem>
}
