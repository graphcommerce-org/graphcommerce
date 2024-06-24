import type {
  MenuQueryFragment,
  CategoryTreeItem,
  NavigationItemFragment,
} from '@graphcommerce/magento-category'
import {
  ProductFiltersProCategoryAccordion,
  ProductFiltersProCategoryAccordionProps,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { useMemo } from 'react'

type MenuItem = NavigationItemFragment & {
  children?: Array<MenuItem | null | undefined> | null | undefined
}

type TreeItem = NavigationItemFragment & {
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

function isParent<U extends TreeItem>(item: U, parent: U): boolean {
  let p: U | undefined = parent.parent as U | undefined

  while (p) {
    if (p.uid === item.uid) return true
    p = p.parent as U | undefined
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
  const { form, submit } = useProductFiltersPro()

  const name = `filters.category_uid.in` as const
  const currentFilter = useWatch({ control: form.control, name })

  const treeWithCounts = useMemo(() => {
    const rootCategory = menu?.items?.[0]
    if (!rootCategory) return []

    let tree: TreeItem | undefined = menuItemToTreeItem(rootCategory, undefined)

    const activeItem = treeFind(tree, (item) => currentFilter?.includes(item.uid) ?? false) ?? tree

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

    return treeFlatMap<TreeItem, CategoryTreeItem>(tree, (item, level) => ({
      uid: item.uid,
      title: item.name,
      value: item.url_path ?? '',
      selected: currentFilter?.includes(item.uid) ?? false,
      indent: level,
      count: null,
      // count: currentCounts.find((i) => item.uid === i.value)?.count ?? null,
      isBack: isParent(item, activeItem),
    }))
  }, [currentFilter, menu?.items])

  if (!treeWithCounts) return null

  return (
    <ProductFiltersProCategoryAccordion
      categoryTree={treeWithCounts}
      {...props}
      onChange={async (item) => {
        form.setValue('filters', {
          category_uid: {
            in:
              item.uid === currentFilter?.[0] || item.uid === treeWithCounts[0].uid
                ? null
                : [item?.uid],
          },
        })

        await submit()
      }}
    />
  )
}
