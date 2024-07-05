import { ProductListParams } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { CategoryBreadcrumbFragment } from '../components/CategoryBreadcrumb'
import { CategoryChildrenFragment } from '../components/CategoryChildren/CategoryChildren.gql'

export type UseCategoryTreeProps = {
  category?: CategoryChildrenFragment & CategoryBreadcrumbFragment
  params?: ProductListParams
  hideBreadcrumbs?: boolean | null
}

export type CategoryTreeItem = {
  title: React.ReactNode
  value: string
  selected: boolean
  isBack?: boolean
  indent: number
  uid: string
  count: null | number
}

export function useCategoryTree(props: UseCategoryTreeProps): CategoryTreeItem[] | null {
  const { category, params, hideBreadcrumbs } = props

  if (!params || !category || !category.url_path || !category.name) return null

  const parents = filterNonNullableKeys(category?.breadcrumbs, [
    'category_name',
    'category_level',
    'category_url_path',
  ]).map<CategoryTreeItem>((breadcrumb) => ({
    title: breadcrumb.category_name,
    value: breadcrumb.category_url_path,
    indent: 0,
    isBack: true,
    selected: params?.url === breadcrumb.category_url_path,
    uid: breadcrumb.category_uid,
    count: null,
  }))

  let children = filterNonNullableKeys(category.children, [
    'url_path',
    'name',
    'include_in_menu',
  ]).map<CategoryTreeItem>((categoryItem) => ({
    title: <>{`${`${categoryItem.name}`}`}</>,
    value: categoryItem.url_path,
    indent: hideBreadcrumbs ? 0 : 2,
    isBack: false,
    selected: params.url === categoryItem.url_path,
    uid: categoryItem.uid,
    count: null,
  }))

  if (!children.find((item) => item.value === category.url_path) && !hideBreadcrumbs)
    children.push({
      title: <> {category.name}</>,
      value: category.url_path,
      indent: 1,
      isBack: false,
      selected: true,
      uid: category.uid,
      count: null,
    })
  else if (!hideBreadcrumbs) children = children.map((child) => ({ ...child, indent: 2 }))

  if (hideBreadcrumbs) return children.sort((a, b) => a.indent - b.indent)

  return [...parents, ...children].sort((a, b) => a.indent - b.indent)
}
