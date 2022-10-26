import { ContainerWithHeader, Link } from '@graphcommerce/next-ui'
import { ProductListItems, ProductListItemsProps } from '../../../ProductListItems/ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'

type GridProps = RowProductFragment & ProductListItemsProps

export function Grid(props: GridProps) {
  const { title, pageLinks, productCopy, ...productListItems } = props

  return (
    <ContainerWithHeader
      title={title}
      rightArea={pageLinks.map((pageLink) => (
        <Link key={pageLink.url} color='inherit' href={pageLink.url} underline='always'>
          {pageLink.title}
        </Link>
      ))}
    >
      <ProductListItems title={title} {...productListItems} size='small' titleComponent='h3' />
    </ContainerWithHeader>
  )
}
