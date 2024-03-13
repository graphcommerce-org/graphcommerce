import { ProductListParams, productListLink } from '@graphcommerce/magento-product'
import { IconSvg, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { CategoryQueryFragment } from '../queries/CategoryQueryFragment.gql'
import { iconChevronLeft } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'

type UseCategoryTreeProps = CategoryQueryFragment & {
  params?: ProductListParams
}
export function useCategoryTree(props: UseCategoryTreeProps) {
  const { categories, params } = props

  const category = categories?.items?.[0]

  if (!params || !category || !category.url_path || !category.name) return null

  const parents = filterNonNullableKeys(category?.breadcrumbs, [
    'category_name',
    'category_level',
    'category_url_path',
  ]).map((breadcrumb) => ({
    title: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconSvg src={iconChevronLeft} />
        {`${breadcrumb.category_name}`}
      </Box>
    ),
    value: productListLink({
      ...params,
      currentPage: 0,
      url: breadcrumb.category_url_path,
      filters: { category_uid: { eq: breadcrumb.category_uid } },
    }),
    indent: 0,
    active: params?.url === breadcrumb.category_url_path,
  }))

  let children = filterNonNullableKeys(category.children, [
    'url_path',
    'name',
    'include_in_menu',
  ]).map((categoryItem) => ({
    title: <>{`${`${categoryItem.name}`}`}</>,
    value: productListLink({
      ...params,
      currentPage: 0,
      url: categoryItem.url_path,
      filters: { category_uid: { eq: categoryItem.uid } },
    }),
    indent: 4,
    active: params.url === categoryItem.url_path,
  }))

  if (!children.find((item) => item.value === `/${category.url_path}`))
    children.push({
      title: <>{`${` ${category.name}`}`}</>,
      value: productListLink({
        ...params,
        currentPage: 0,
        url: category.url_path,
        filters: { category_uid: { eq: category.uid } },
      }),
      indent: 3,
      active: true,
    })
  else children = children.map((child) => ({ ...child, indent: 3 }))

  return parents.concat(children).sort((a, b) => a.indent - b.indent)
}
