import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Container, ContainerProps } from '@material-ui/core'
import { vpCalc, UseStyles } from 'components/Theme'
import clsx from 'clsx'
import { ProductListParams, FilterTypeMap } from 'components/ProductList'
import ProductListItemSimple from '../ProductListItemSimple'
import ProductListItemConfigurable from '../ProductListItemConfigurable'

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

type ProductListItemsParams = GQLProductListItemsFragment &
  UseStyles<typeof useStyles> &
  JSX.IntrinsicElements['div'] & {
    params: ProductListParams
    filterTypeMap: FilterTypeMap
  }

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, params, filterTypeMap, ...divProps } = props
  const classes = useStyles(props)

  return (
    <div {...divProps} className={clsx(classes.productList, divProps.className)}>
      {items.map((item) => {
        switch (item.__typename) {
          case 'ConfigurableProduct':
            return (
              <ProductListItemConfigurable
                {...item}
                key={item.id}
                params={params}
                filterTypeMap={filterTypeMap}
              />
            )
          case 'SimpleProduct':
            return <ProductListItemSimple {...item} key={item.id} />
          default:
            return <div>${item.__typename}</div>
        }
      })}
    </div>
  )
}
