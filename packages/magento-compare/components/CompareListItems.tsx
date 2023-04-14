import {
  AddProductsToCartForm,
  ProductItemsGridProps,
  ProductListItemsBase,
} from '@graphcommerce/magento-product'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareListStyles } from '../hooks/useCompareListStyles'
import { useCompareVisibleItems } from './CompareForm'

export type CompareListItemsProps = Pick<ProductItemsGridProps, 'renderers' | 'sx'>

export function CompareListItems(props: CompareListItemsProps) {
  const { renderers, sx } = props

  const compareList = useCompareList().data?.compareList
  const compareListCount = compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3

  const compareListStyles = useCompareListStyles(gridColumns)

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
