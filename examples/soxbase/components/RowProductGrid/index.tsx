import { Container, Link, makeStyles, Theme } from '@material-ui/core'
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
  }),
  { name: 'RowProductGrid' },
)

export default function RowProductGrid(props: RowProductGridProps) {
  const { title, pageLinks, magentoCategory, ...productListItems } = props
  const classes = useStyles(props)

  // <Row/ContainerWithHeader title={title} rightArea={pageLinks}>
  // <ProductListItems {...productListItems} classes={{ productList: classes.productList }} />
  // </Row/ContainerWithHeader>
  return (
    <Container className={classes.container}>
      {title && (
        <SmallProductGridHeader
          title={title}
          pageLinks={pageLinks.map((pageLink) => (
            <PageLink href={pageLink.url} key={pageLink.url} passHref>
              <Link color='textPrimary' href={pageLink.url} underline='always'>
                {pageLink.title}
              </Link>
            </PageLink>
          ))}
        />
      )}
      <ProductListItems {...productListItems} size='small' />
    </Container>
  )
}
