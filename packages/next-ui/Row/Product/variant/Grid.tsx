import { ContainerWithHeader } from '../../../ContainerWithHeader/ContainerWithHeader'
import { Link } from '@mui/material'
import { ProductListItems, ProductListItemsProps } from '../ProductListItems'
import { RowProductProps } from '../type'

type GridProps = RowProductProps & ProductListItemsProps

export function Grid(props: GridProps) {
  const { title, links, copy, ...productListItems } = props

  return (
    <ContainerWithHeader
      title={title}
      rightArea={links.map((pageLink) => (
        <Link color='inherit' href={pageLink.url} key={pageLink.url} underline='always'>
          {pageLink.title}
        </Link>
      ))}
    >
      <ProductListItems title={title} {...productListItems} size='small' titleComponent='h3' />
    </ContainerWithHeader>
  )
}
