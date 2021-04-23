import { ProductListItemsFragment } from '@reachdigital/magento-product-types/ProductListItems.gql'
import RenderType from '@reachdigital/next-ui/RenderType'
import SwipeableGrid from '@reachdigital/next-ui/Row/SwipeableGrid'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import renderers from '../ProductListItems/renderers'
import { RowSwipeableGridFragment } from './RowSwipeableGrid.gql'

type RowSwipeableGridProps = RowSwipeableGridFragment & ProductListItemsFragment

function Items(props: RowSwipeableGridProps & UseStyles<any>) {
  const { classes, items } = props

  return (
    <>
      {items?.map((item) =>
        item ? (
          <RenderType
            key={item.id ?? ''}
            renderer={renderers}
            {...item}
            classes={{ item: classes?.item }}
            imageOnly
          />
        ) : null,
      )}
    </>
  )
}

export default function RowSwipeableGrid(props: RowSwipeableGridProps) {
  const { title, items } = props

  if (!items || items.length === 0) return null

  return (
    <SwipeableGrid title={title} Items={(itemClasses) => <Items {...itemClasses} {...props} />} />
  )
}
