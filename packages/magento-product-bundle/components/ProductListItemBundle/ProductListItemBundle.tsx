import type { ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItem } from '@graphcommerce/magento-product'
import type { ProductListItemBundleFragment } from '../../graphql'

export type ProdustListItemBundleProps = ProductListItemBundleFragment & ProductListItemProps

export function ProductListItemBundle(props: ProdustListItemBundleProps) {
  const { children } = props

  return <ProductListItem {...props}>{children}</ProductListItem>
}
