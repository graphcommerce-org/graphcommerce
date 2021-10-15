import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { Link } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import ProductListItems, { ProductListItemsProps } from '../../../ProductListItems/ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'

type GridProps = RowProductFragment & ProductListItemsProps

export default function Grid(props: GridProps) {
  const { title, pageLinks, ...productListItems } = props

  console.log(props)

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
