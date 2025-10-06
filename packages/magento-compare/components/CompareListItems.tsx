import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { AddProductsToCartForm, ProductListItemsBase } from '@graphcommerce/magento-product'
import { useCompareListStyles } from '../hooks/useCompareListStyles'
import { useCompareVisibleItems } from './CompareListForm'

export type CompareListItemsProps = Pick<ProductItemsGridProps, 'renderers' | 'sx'>

export function CompareListItems(props: CompareListItemsProps) {
  const { renderers, sx } = props

  const compareListStyles = useCompareListStyles()

  const items = useCompareVisibleItems().map((i) => i.product)

  return (
    <AddProductsToCartForm>
      <ProductListItemsBase
        title='Compare items'
        items={items}
        renderers={renderers}
        sx={[compareListStyles, ...(Array.isArray(sx) ? sx : [sx])]}
      />
    </AddProductsToCartForm>
  )
}
