import { Container, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import ProductListItemsSlider from '../ProductListItems/ProductListItemsSlider'
import { RowProductGridFragment } from './RowProductGrid.gql'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  },
  slider: {
    position: 'relative',
    '& > div': {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 360)}, 1fr))`,
    },
    '& > div > *': {
      minWidth: responsiveVal(150, 360),
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
}))

type RowProductGridProps = RowProductGridFragment & ProductListItemsProps

export default function RowProductGrid(props: RowProductGridProps) {
  const { title, pageLinks, magentoCategory, ...productListItems } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.head}>
        <Typography variant='h2' className={classes.title}>
          {title}
        </Typography>
        <div>
          {pageLinks.map((pageLink) => {
            return (
              <NextUiPageLink href={pageLink.url}>
                <a href={pageLink.url} className={classes.url}>
                  {pageLink.title}
                </a>
              </NextUiPageLink>
            )
          })}
        </div>
      </div>
      <div className={classes.slider}>
        <ProductListItemsSlider {...productListItems} />
      </div>
    </Container>
  )
}
