import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Container, ContainerProps } from '@material-ui/core'
import { vpCalc, UseStyles } from 'components/Theme'
import clsx from 'clsx'
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
  JSX.IntrinsicElements['div']

export default function ProductListItems(props: ProductListItemsParams) {
  const { items, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <div {...containerProps} className={clsx(classes.productList, containerProps.className)}>
      {items.map((item) => {
        switch (item.__typename) {
          case 'ConfigurableProduct':
            return <ProductListItemConfigurable {...item} key={item.id} />
          case 'SimpleProduct':
            return <ProductListItemSimple {...item} key={item.id} />
          default:
            return <div>${item.__typename}</div>
        }
      })}
    </div>
  )
}
