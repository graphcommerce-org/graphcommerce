import {
  ProductItemsGridProps,
  ProductListItemRenderer,
  ProductListItemsBase,
} from '@graphcommerce/magento-product'
import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'

type GridProps = RowProductFragment &
  Omit<ProductItemsGridProps, 'renderers'> & { productListItemRenderer: ProductListItemRenderer }

export function Grid(props: GridProps) {
  const { title, pageLinks, productCopy, productListItemRenderer, ...productListItems } = props

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
        renderers={productListItemRenderer}
        title={title}
        {...productListItems}
        size='small'
        titleComponent='h3'
      />
    </ContainerWithHeader>
  )
}
