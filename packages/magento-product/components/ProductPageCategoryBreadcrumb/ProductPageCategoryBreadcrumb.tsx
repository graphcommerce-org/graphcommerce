import { Breadcrumbs, Link, Typography } from '@mui/material'
import { ProductPageCategoryBreadcrumbFragment } from './ProductPageCategoryBreadcrumb.gql'

export function ProductPageCategoryBreadcrumb(props: ProductPageCategoryBreadcrumbFragment) {
  const { breadcrumbs, name } = props
  return (
    <Breadcrumbs>
      <Link underline='hover' color='inherit' href='/'>
        Home
      </Link>
      {breadcrumbs?.map((mapped_category, i) => (
        <Link
          underline='hover'
          key={mapped_category?.category_uid}
          color='inherit'
          href={`/${mapped_category?.category_url_path}`}
        >
          {`${mapped_category?.category_name}`}
        </Link>
      ))}
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
