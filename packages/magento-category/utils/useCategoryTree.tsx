import { ProductListParams, productListLink } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { CategoryQueryFragment } from '../queries/CategoryQueryFragment.gql'

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
    level: breadcrumb.category_level,
    title: `${`> ${breadcrumb.category_name}`}`,
    value: productListLink({
      ...params,
      currentPage: 0,
      url: breadcrumb.category_url_path,
      filters: { category_uid: { eq: breadcrumb.category_uid } },
    }),
    active: params?.url === breadcrumb.category_url_path,
  }))

  const children = filterNonNullableKeys(category.children, [
    'url_path',
    'name',
    'include_in_menu',
  ]).map((categoryItem) => ({
    level: Math.max(...parents.map((breadcrumb) => breadcrumb.level)) + 1,
    title: `${`* ${categoryItem.name}`}`,
    value: productListLink({
      ...params,
      currentPage: 0,
      url: categoryItem.url_path,
      filters: { category_uid: { eq: categoryItem.uid } },
    }),
    active: params.url === categoryItem.url_path,
  }))

  if (!children.find((item) => item.value === `/${category.url_path}`))
    children.push({
      level: Math.max(...parents.map((breadcrumb) => breadcrumb.level)),
      title: `${`> ${category.name}`}`,
      value: productListLink({
        ...params,
        currentPage: 0,
        url: category.url_path,
        filters: { category_uid: { eq: category.uid } },
      }),
      active: true,
    })

  return parents.concat(children).sort((a, b) => a.level - b.level)
}
