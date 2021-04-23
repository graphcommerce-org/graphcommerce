import MuiProductGridLink from '@reachdigital/next-ui/Row/MuiProductGridLink'
import ProductGrid from '@reachdigital/next-ui/Row/ProductGrid'
import PageLink from 'next/link'
import React from 'react'
import ProductListItems, { ProductListItemsProps } from '../ProductListItems/ProductListItems'
import { RowProductGridFragment } from './RowProductGrid.gql'

type RowProductGridProps = RowProductGridFragment & ProductListItemsProps

export default function RowProductGrid(props: RowProductGridProps) {
  const { title, pageLinks, magentoCategory, ...productListItems } = props

  return (
    <ProductGrid
      title={title}
      pageLinks={pageLinks.map((pageLink) => (
        <PageLink href={pageLink.url} key={pageLink.url} passHref>
          <MuiProductGridLink title={pageLink.title} url={pageLink.url} />
        </PageLink>
      ))}
      productListItems={<ProductListItems {...productListItems} />}
    />
  )
}
