import { ProductListParams } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { CategoryBreadcrumbFragment } from '../components/CategoryBreadcrumb'
import { CategoryChildrenFragment } from '../components/CategoryChildren/CategoryChildren.gql'

export type UseCategoryTreeProps = {
  category?: CategoryChildrenFragment & CategoryBreadcrumbFragment
  params?: ProductListParams
}

type CategoryTreeItem = {
  title: React.ReactNode
  value: string
  selected: boolean
  isBack?: boolean
  indent: number
  uid: string
}

export function useCategoryTree(props: UseCategoryTreeProps): CategoryTreeItem[] | null {
  const { category, params } = props

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
  }))

  let children = filterNonNullableKeys(category.children, [
    'url_path',
    'name',
    'include_in_menu',
  ]).map<CategoryTreeItem>((categoryItem) => ({
    title: <>{`${`${categoryItem.name}`}`}</>,
    value: categoryItem.url_path,
    indent: 2,
    isBack: false,
    selected: params.url === categoryItem.url_path,
    uid: categoryItem.uid,
  }))

  if (!children.find((item) => item.value === category.url_path))
    children.push({
      title: <> {category.name}</>,
      value: category.url_path,
      indent: 1,
      isBack: false,
      selected: true,
      uid: category.uid,
    })
  else children = children.map((child) => ({ ...child, indent: 2 }))

  return [...parents, ...children].sort((a, b) => a.indent - b.indent)
}
