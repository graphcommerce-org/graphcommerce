import { Container, Link, makeStyles, Theme } from '@material-ui/core'
import MuiProductGridLink from '@reachdigital/next-ui/Row/MuiProductGridLink'
import SmallProductGridHeader from '@reachdigital/next-ui/SmallProductGridHeader'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import PageLink from 'next/link'
import React from 'react'
import ProductListItems, { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import { RowProductGridFragment } from './RowProductGrid.gql'

type RowProductGridProps = RowProductGridFragment & ProductListItemsProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
    productList: {
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 260)}, 1fr))`,
    },
    url: {
      ...theme.typography.body1,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
  }),
  { name: 'RowProductGrid' },
)

export default function RowProductGrid(props: RowProductGridProps) {
  const { title, pageLinks, magentoCategory, ...productListItems } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.container}>
      {title && (
        <SmallProductGridHeader
          title={title}
          pageLinks={pageLinks.map((pageLink) => (
            <PageLink href={pageLink.url} key={pageLink.url} passHref>
              <Link href={pageLink.url} className={classes.url} underline='always'>
                {title}
              </Link>
            </PageLink>
          ))}
        />
      )}
      <ProductListItems {...productListItems} classes={{ productList: classes.productList }} />
    </Container>
  )
}
