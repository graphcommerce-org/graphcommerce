import type {
  CategoryTreeItem,
  MenuQueryFragment,
  NavigationItemFragment,
} from '@graphcommerce/magento-category'
import type { ProductFiltersProCategoryAccordionProps } from '@graphcommerce/magento-product'
import {
  ProductFiltersProCategoryAccordion,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useMemo } from 'react'

type MenuItem = NavigationItemFragment & {
  children?: Array<MenuItem | null | undefined> | null | undefined
}

type TreeItem = NavigationItemFragment & {
  visible?: boolean
  parent: TreeItem | undefined
  children: TreeItem[]
}

function menuItemToTreeItem(item: MenuItem, parent: TreeItem | undefined): TreeItem {
  const newItem: TreeItem = { ...item, parent, children: [] }
  newItem.children = filterNonNullableKeys(item.children).map((child) =>
    menuItemToTreeItem(child, newItem),
  )
  return newItem
}

function treeFind<U extends TreeItem>(tree: U, fn: (item: U) => boolean): U | undefined {
  if (fn(tree)) return tree
  for (const child of tree.children ?? []) {
    const found = treeFind<U>(child as U, fn)
    if (found) return found
  }
  return undefined
}

function treeFlatMap<U extends TreeItem, R>(
  tree: U | undefined,
  cb: (item: U, level: number) => R,
  _level = 0,
): R[] {
  if (!tree) return []

  const mapped = cb(tree, _level)
  const children = tree.children.flatMap((child) => treeFlatMap(child as U, cb, _level + 1))
  return [mapped, ...children]
}

function treeWalkFilter<U extends TreeItem>(
  treeItem: U,
  fn: (newTreeItem: U) => boolean,
): U | undefined {
  const children = treeItem.children.map((child) => treeWalkFilter(child as U, fn)).filter(Boolean)
  const newTreeItem = { ...treeItem, children }
  return children.length > 0 || fn(newTreeItem) ? newTreeItem : undefined
}

function treeWalk<U extends TreeItem>(root: U | undefined, fn: (item: U) => void) {
  if (!root) return
  root.children.map((child) => treeWalk(child as U, fn))
  fn(root)
}

function allParents<U extends TreeItem>(item: U): U[] {
  const parents = item.parent ? [item.parent, ...allParents(item.parent)] : []
  return parents as U[]
}

function isParent<U extends TreeItem>(item: U, parent: U): boolean {
  let p = parent.parent
  while (p) {
    if (p.uid === item.uid) return true
    p = p.parent
  }
  return false
}

type ProductFiltersProCategorySectionSearchProps = Omit<
  ProductFiltersProCategoryAccordionProps,
  'categoryTree' | 'onChange'
> & {
  menu?: MenuQueryFragment['menu']
}

export function ProductFiltersProCategorySectionSearch(
  props: ProductFiltersProCategorySectionSearchProps,
) {
  const { menu } = props
  const { form, submit, params, aggregations } = useProductFiltersPro()
  const currentFilter = params.filters.category_uid?.in

  const categoryTree = useMemo(() => {
    const rootCategory = menu?.items?.[0]
    if (!rootCategory) return []

    let tree: TreeItem | undefined = menuItemToTreeItem(rootCategory, undefined)

    const currentCounts = aggregations?.find((a) => a?.attribute_code === 'category_uid')?.options

    const activeItem = treeFind(tree, (item) => currentFilter?.includes(item.uid) ?? false) ?? tree

    // Mark all parents as visible if they have a count.
    treeWalk(tree, (item) => {
      const count = currentCounts?.find((i) => item.uid === i?.value)?.count ?? null
      if (!count) return

      item.visible = true
      allParents(item).forEach((p) => {
        p.visible = true
      })
    })

    tree = treeWalkFilter(tree, (item) => {
      // If currently active
      if (activeItem.uid === item.uid) return true

      if (!item.include_in_menu) return false

      // Show direct children of active item.
      if (activeItem.uid === item.parent?.uid) return true

      // Show siblings if there are are only a few children.
      if (activeItem.children.length <= 5 && item.parent?.uid === activeItem.parent?.uid)
        return true

      return false
    })

    // Als een child een count heeft, dan alle parents ook een count geven

    return treeFlatMap<TreeItem, CategoryTreeItem>(tree, (item, level) => {
      const count = currentCounts?.find((i) => item.uid === i?.value)?.count ?? null

      return {
        uid: item.uid,
        title: item.name,
        value: item.url_path ?? '',
        selected: currentFilter?.includes(item.uid) ?? false,
        indent: level - 1,
        count,
        isBack: isParent(item, activeItem),
        visible: item.visible,
      }
    })
      .slice(1)
      .filter((c) => c.visible)
  }, [aggregations, currentFilter, menu?.items])

  if (!categoryTree.length) return null

  return (
    <ProductFiltersProCategoryAccordion
      categoryTree={categoryTree}
      {...props}
      onChange={async (item) => {
        form.setValue('filters', {
          category_uid: {
            in: item.uid === currentFilter?.[0] ? null : [item?.uid],
          },
        })

        await submit()
      }}
    />
  )
}
