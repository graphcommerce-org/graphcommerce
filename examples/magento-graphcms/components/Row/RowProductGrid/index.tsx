import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import ProductListItems, { ProductListItemsProps } from '../../ProductListItems/ProductListItems'
import { RowProductGridFragment } from './RowProductGrid.gql'

type RowProductGridProps = RowProductGridFragment & ProductListItemsProps

export default function RowProductGrid(props: RowProductGridProps) {
  const { title, pageLinks, magentoCategory, ...productListItems } = props

  return (
    <ContainerWithHeader
      title={title}
      rightArea={pageLinks.map((pageLink) => (
        <PageLink href={pageLink.url} key={pageLink.url} passHref>
          <Link color='inherit' href={pageLink.url} underline='always'>
            {pageLink.title}
          </Link>
        </PageLink>
      ))}
    >
      <ProductListItems {...productListItems} size='small' />
    </ContainerWithHeader>
  )
}
