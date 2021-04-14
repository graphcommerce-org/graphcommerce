import { Container, Typography, Theme, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import PageLink from 'next/link'
import React from 'react'
import ProductListItems, { ProductListItemsProps } from '../ProductListItems/ProductListItems'

import { RowProductGridFragment } from './RowProductGrid.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
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
      color: theme.palette.text.primary,
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
            <PageLink href={pageLink.url} key={pageLink.url} passHref>
              <Link href={pageLink.url} className={classes.url} underline='always'>
                {pageLink.title}
              </Link>
            </PageLink>
          ))}
        </div>
      </div>
      <div className={classes.grid}>
        <ProductListItems {...productListItems} />
      </div>
    </Container>
  )
}
