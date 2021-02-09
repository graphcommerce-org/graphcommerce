import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RowSwipeableGridFragment } from './RowSwipeableGrid.gql'
import { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import ProductListItemsSlider from '../ProductListItems/ProductListItemsSlider'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '25% 75%',
    maxWidth: '100%',
    paddingLeft: responsiveVal(15, 40),
    marginBottom: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  },
  copy: {
    display: 'grid',
    alignContent: 'space-between',
  },
  h2: {
    ...theme.typography.h1,
    fontSize: responsiveVal(20, 40),
    marginRight: `${theme.spacings.lg}`,
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
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(200, 800)}, 1fr))`,
    },
    '& > div > div': {
      minWidth: responsiveVal(200, 800),
    },
    '& > div > div > div, & > div > div > a > div > div': {
      //show only images
      display: 'none',
    },
  },
  externalpagination: {
    fontSize: responsiveVal(18, 26),
    width: 'min-width',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      fontWeight: 500,
    },
  },
}))

type RowSwipeableGridProps = RowSwipeableGridFragment & ProductListItemsProps

export default function RowSwipeableGrid(props: RowSwipeableGridProps) {
  const { title, ...productListItems } = props
  const classes = useStyles()
  const [exPagination, setExPagination] = useState<boolean[]>([])
  const curRef = useRef<HTMLInputElement>()
  let current =
    exPagination.findIndex((index) => index === true) != -1
      ? exPagination.findIndex((index) => index === true) + 1
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
          {...productListItems}
        />
      </div>
    </div>
  )
}
