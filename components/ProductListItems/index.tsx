import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { vpCalc, UseStyles } from 'components/Theme'
import clsx from 'clsx'
import { FilterTypeMap } from 'components/ProductListItems/filterTypes'
import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'

const useStyles = makeStyles(
  (theme: Theme) => ({
    productList: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.gutter,
      gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(150, 285)}, 1fr))`,
    },
  }),
  { name: 'ProductList' },
)

type ProductListRenderer = GQLTypeRenderer<
  GQLProductListItemsFragment['items'][0],
  { filterTypeMap: FilterTypeMap }
>

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
      {items.map((item) => (
        <GQLRenderType renderer={renderers} {...item} key={item.id} filterTypeMap={filterTypeMap} />
      ))}
    </div>
  )
}
