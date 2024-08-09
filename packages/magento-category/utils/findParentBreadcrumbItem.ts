import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { CategoryBreadcrumbFragment } from '../components/CategoryBreadcrumb'

export function findParentBreadcrumbItem(category: CategoryBreadcrumbFragment | null | undefined) {
  const parentCategoryPath = category?.url_path?.split('/').slice(0, -1).join('/')

  return filterNonNullableKeys(category?.breadcrumbs, ['category_url_path', 'category_name']).find(
    (c) => parentCategoryPath === c.category_url_path,
  )
}
