import { ContainerWithHeader } from '@graphcommerce/next-ui'
import Link from '@mui/material/Link'
import { ProductListItems, ProductListItemsProps } from '../../../ProductListItems/ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'

type GridProps = RowProductFragment & ProductListItemsProps

export function Grid(props: GridProps) {
  const { title, pageLinks, productCopy, ...productListItems } = props

  return (
    <ContainerWithHeader
      title={title}
      rightArea={pageLinks.map((pageLink) => (
        <Link color='inherit' href={pageLink.url} key={pageLink.url} underline='always'>
          {pageLink.title}
        </Link>
      ))}
    >
      <ProductListItems title={title} {...productListItems} size='small' titleComponent='h3' />
    </ContainerWithHeader>
  )
}
