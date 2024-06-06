import { ProductListParams, productListLink } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { CategoryBreadcrumbFragment } from '../components/CategoryBreadcrumb'
import { CategoryChildrenFragment } from '../components/CategoryChildren/CategoryChildren.gql'

export type UseCategoryTreeProps = {
  category: CategoryChildrenFragment & CategoryBreadcrumbFragment
  params?: ProductListParams
}

type CategoryTreeItem = {
  title: React.ReactNode
  href: string
  selected: boolean
  isBack?: boolean
  indent: number
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
    href: productListLink({
      ...params,
      currentPage: 0,
      url: breadcrumb.category_url_path,
      filters: { category_uid: { eq: breadcrumb.category_uid } },
    }),
    indent: 0,
    isBack: true,
    selected: params?.url === breadcrumb.category_url_path,
  }))

  let children = filterNonNullableKeys(category.children, [
    'url_path',
    'name',
    'include_in_menu',
  ]).map<CategoryTreeItem>((categoryItem) => ({
    title: <>{`${`${categoryItem.name}`}`}</>,
    href: productListLink({
      ...params,
      currentPage: 0,
      url: categoryItem.url_path,
      filters: { category_uid: { eq: categoryItem.uid } },
    }),
    indent: 2,
    isBack: false,
    selected: params.url === categoryItem.url_path,
  }))

  if (!children.find((item) => item.href === `/${category.url_path}`))
    children.push({
      title: <> {category.name}</>,
      href: productListLink({
        ...params,
        currentPage: 0,
        url: category.url_path,
        filters: { category_uid: { eq: category.uid } },
      }),
      indent: 1,
      isBack: false,
      selected: true,
    })
  else children = children.map((child) => ({ ...child, indent: 2 }))

  return [...parents, ...children].sort((a, b) => a.indent - b.indent)
}
