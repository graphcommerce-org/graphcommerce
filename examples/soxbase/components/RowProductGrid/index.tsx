import { Container, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import ProductListItems, { ProductListItemsProps } from '../ProductListItems/ProductListItems'

import { RowProductGridFragment } from './RowProductGrid.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
      [theme.breakpoints.up('md')]: {
        marginBottom: `${theme.spacings.xl}`,
      },
    },
    grid: {
      '& > div': {
        display: 'grid',
        gridColumnGap: theme.spacings.md,
        gridRowGap: theme.spacings.lg,
        gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 260)}, 1fr))`,
      },
      '& > div > *': {
        minWidth: responsiveVal(150, 260),
      },
      '& > div > div > a > div > div': {
        // hide product options
        display: 'none',
      },
    },
    head: {
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: 'auto auto',
      alignItems: 'center',
      marginBottom: theme.spacings.md,
    },
    title: {
      textTransform: 'uppercase',
      ...theme.typography.h3,
    },
    url: {
      ...theme.typography.body1,
      fontWeight: 400,
      color: theme.palette.primary.contrastText,
    },
  }),
  { name: 'RowProductGrid' },
)

type RowProductGridProps = RowProductGridFragment & ProductListItemsProps

export default function RowProductGrid(props: RowProductGridProps) {
  const { title, pageLinks, magentoCategory, ...productListItems } = props
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <div className={classes.head}>
        <Typography variant='h2' className={classes.title}>
          {title}
        </Typography>
        <div>
          {pageLinks.map((pageLink) => (
            <NextUiPageLink href={pageLink.url} key={pageLink.url}>
              <a href={pageLink.url} className={classes.url}>
                {pageLink.title}
              </a>
            </NextUiPageLink>
          ))}
        </div>
      </div>
      <div className={classes.grid}>
        <ProductListItems {...productListItems} />
      </div>
    </Container>
  )
}
