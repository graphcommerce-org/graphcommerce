import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'
import { FilterTypeMap } from 'components/Product/ProductListItems/filterTypes'
import { UseStyles } from 'components/Styles'
import responsiveVal from 'components/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

type Items = NonNullable<NonNullable<GQLProductListItemsFragment['items']>[0]>
type ProductListRenderer = GQLTypeRenderer<Items, { filterTypeMap: FilterTypeMap }>

type ProductListItemsParams = GQLProductListItemsFragment &
  UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div'] & {
    filterTypeMap: FilterTypeMap
    renderers: ProductListRenderer
  }

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, filterTypeMap, renderers, ...divProps } = props
  const classes = useStyles(props)

  return (
    <div {...divProps} className={clsx(classes.productList, divProps.className)}>
      {items?.map((item) => {
        if (!item) return null
        return (
          <GQLRenderType
            renderer={renderers}
            {...item}
            key={item?.id ?? ''}
            filterTypeMap={filterTypeMap}
          />
        )
      })}
    </div>
  )
}
