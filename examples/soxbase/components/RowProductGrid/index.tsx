import { Link, makeStyles, Theme } from '@material-ui/core'
import ContainerWithHeader from '@reachdigital/next-ui/ContainerWithHeader'
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

  return (
    <ContainerWithHeader
      title={title}
      rightArea={pageLinks.map((pageLink) => (
        <PageLink href={pageLink.url} key={pageLink.url} passHref>
          <Link color='textPrimary' href={pageLink.url} underline='always'>
            {pageLink.title}
          </Link>
        </PageLink>
      ))}
      classes={classes}
    >
      <ProductListItems {...productListItems} size='small' />
    </ContainerWithHeader>
  )
}
