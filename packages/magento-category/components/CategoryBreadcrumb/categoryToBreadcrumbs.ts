import { productListLink } from '@graphcommerce/magento-product'
import type { BreadcrumbsType } from '@graphcommerce/next-ui'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

export function categoryToBreadcrumbs(
  category: CategoryBreadcrumbFragment,
): BreadcrumbsType['breadcrumbs'] {
  if (!category.url_path || !category.name) return []

  return [
    ...filterNonNullableKeys(category.breadcrumbs, [
      'category_level',
      'category_name',
      'category_url_path',
    ])
      .sort((a, b) => a.category_level - b.category_level)
      .map(({ category_url_path, category_name }) => ({
        href: productListLink({ url: category_url_path, filters: {}, sort: {} }),
        name: category_name,
      })),
    {
      href: productListLink({
        url: category.url_path,
        filters: {},
        sort: {},
      }),
      name: category.name,
    },
  ]
}
