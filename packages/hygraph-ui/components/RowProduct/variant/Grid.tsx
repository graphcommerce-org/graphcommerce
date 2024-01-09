import { ProductItemsGridProps, ProductListItemsBase } from '@graphcommerce/magento-product'
import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'
import { productListRenderer } from '../../../../../examples/magento-graphcms/components/ProductListItems/productListRenderer'

type GridProps = RowProductFragment & Omit<ProductItemsGridProps, 'renderers'>

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
      <ProductListItemsBase
        renderers={productListRenderer}
        title={title}
        {...productListItems}
        size='small'
        titleComponent='h3'
      />
    </ContainerWithHeader>
  )
}
