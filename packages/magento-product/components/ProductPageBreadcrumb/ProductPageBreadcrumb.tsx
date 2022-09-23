import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

export function ProductPageBreadcrumb(props: ProductPageBreadcrumbFragment) {
  const { categories, name } = props
  const prev = usePrevPageRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(props)

  return (
    <Breadcrumbs>
      <Link underline='hover' color='inherit' href='/'>
        Home
      </Link>
      {category?.breadcrumbs?.map((mapped_category, i) => (
        <Link
          underline='hover'
          key={mapped_category?.category_uid}
          color='inherit'
          href={`/${mapped_category?.category_url_path}`}
        >
          {`${mapped_category?.category_name}`}
        </Link>
      ))}
      <Link underline='hover' color='inherit' href={`/${category?.url_path}`}>
        {category?.name}
      </Link>
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
