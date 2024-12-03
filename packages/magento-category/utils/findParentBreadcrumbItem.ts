import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type { CategoryBreadcrumbFragment } from '../components/CategoryBreadcrumb'

export function findParentBreadcrumbItem(
  category: CategoryBreadcrumbFragment | null | undefined,
): NonNullable<CategoryBreadcrumbFragment['breadcrumbs']>[number] | undefined {
  const parentCategoryPath = category?.url_path?.split('/').slice(0, -1).join('/')

  return filterNonNullableKeys(category?.breadcrumbs, ['category_url_path']).find(
    (c) => parentCategoryPath === c.category_url_path,
  )
}
