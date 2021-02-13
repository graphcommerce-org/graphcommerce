import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React, { useRef, useState } from 'react'
import { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import ProductListItemsSlider from '../ProductListItems/ProductListItemsSlider'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '25% 75%',
      maxWidth: '100%',
      marginBottom: `${theme.spacings.xl}`,
    },
    copy: {
      display: 'grid',
      alignContent: 'space-between',
    },
    h2: {
      ...theme.typography.h1,
      fontSize: responsiveVal(20, 40),
      marginRight: `${theme.spacings.lg}`,
      marginLeft: theme.page.horizontal,
      [theme.breakpoints.up('md')]: {
        width: '40%',
        minWidth: 250,
      },
    },
    slider: {
      position: 'relative',
      '& > div': {
        display: 'grid',
        gridColumnGap: theme.spacings.md,
        gridRowGap: theme.spacings.lg,
        alignContent: 'space-around',
        gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(200, 400)}, 1fr))`,
      },
      '& > div > div': {
        minWidth: responsiveVal(200, 400),
      },
    },
    externalpagination: {
      display: 'none',
      fontSize: responsiveVal(18, 26),
      width: 'min-width',
      fontWeight: 500,
      [theme.breakpoints.up('md')]: {
        fontWeight: 500,
      },
    },
  }),
  { name: 'RelatedProducts' },
)

type Props = {
  title?: string
}

type RelatedProductsProps = Props & ProductListItemsProps

export default function RelatedProducts(props: RelatedProductsProps) {
  const { title, items, ...productListItems } = props
  const classes = useStyles()
  const [exPagination, setExPagination] = useState<boolean[]>([])
  const curRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const relatedProductItems = {
    ...productListItems,
    items,
  }

  const indexesOf = (arr, item) => arr.reduce((acc, v, i) => (v === item && acc.push(i), acc), [])
  const indexesInViewport = indexesOf(exPagination, true)

  const current =
    indexesInViewport.length !== 0
      ? Number(indexesInViewport[indexesInViewport.length - 1]) + 1
      : String(curRef?.current?.innerHTML)

  return (
    <div className={classes.root}>
      <div className={classes.copy}>
        <Typography variant='h2' className={classes.h2}>
          {title}
        </Typography>
        <div>
          {exPagination && (
            <div className={classes.externalpagination}>
              <span ref={curRef}>{String(current).padStart(2, '0')}</span> —{' '}
              {String(exPagination.length).padStart(2, '0')}
            </div>
          )}
        </div>
      </div>

      <div className={classes.slider}>
        <ProductListItemsSlider
          nobuttons
          exPagination={exPagination}
          setExPagination={setExPagination}
          {...relatedProductItems}
        />
      </div>
    </div>
  )
}
