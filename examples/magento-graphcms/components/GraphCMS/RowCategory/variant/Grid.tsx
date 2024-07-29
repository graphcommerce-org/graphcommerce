import { productListLink } from '@graphcommerce/magento-product'
import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { ProductListItems } from '../../../ProductListItems'
import { RowCategoryFragment } from '../RowCategory.gql'

type GridProps = RowCategoryFragment

export function Grid(props: GridProps) {
  const { category } = props

  if (!category?.name) return null
  const { name, include_in_menu, url_path, products } = category

  return (
    <ContainerWithHeader
      title={name}
      rightArea={
        include_in_menu &&
        url_path && (
          <Link
            color='inherit'
            href={productListLink({ url: url_path, filters: {}, sort: {} })}
            underline='always'
          >
            {name}
          </Link>
        )
      }
    >
      <ProductListItems title={name} items={products?.items} size='small' titleComponent='h3' />
    </ContainerWithHeader>
  )
}
