import { ProductListItemsBase } from '@graphcommerce/magento-product'
import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems'
import { RowProductFragment } from '../RowProduct.gql'

type GridProps = RowProductFragment

export function Grid(props: GridProps) {
  const { title, pageLinks, category } = props

  return (
    <ContainerWithHeader
      title={title}
      rightArea={pageLinks.map((pageLink) => (
        <Link color='inherit' href={pageLink.url} key={pageLink.url} underline='always'>
          {pageLink.title}
        </Link>
      ))}
    >
      <ProductListItemsBase
        renderers={productListRenderer}
        title={title}
        items={category?.products?.items}
        size='small'
        titleComponent='h3'
      />
    </ContainerWithHeader>
  )
}
