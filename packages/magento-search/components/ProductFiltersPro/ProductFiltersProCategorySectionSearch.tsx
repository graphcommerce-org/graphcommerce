import { MenuQueryFragment, CategoryTreeItem } from '@graphcommerce/magento-category'
import { NavigationItemFragment } from '@graphcommerce/magento-category/queries/NavigationItem.gql'
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

function treeMap<U extends TreeItem>(tree: TreeItem, fn: (item: TreeItem) => U): U {
  const parent = fn(tree)
  if (parent.children)
    parent.children = parent.children.map((child) => {
      const newChild = treeMap(child, fn)
      newChild.parent = parent
      return newChild
    })
  return parent
}

function treeParents<U extends TreeItem>(tree: U, fn: (item: U) => void) {
  let item: U | undefined = tree.parent as U
  while (item) {
    fn(item)
    item = item.parent as U
  }
}

function treeFind<U extends TreeItem>(tree: U, fn: (item: U) => boolean): U | undefined {
  if (fn(tree)) return tree
  for (const child of tree.children ?? []) {
    const found = treeFind(child, fn)
    if (found) return found
  }
  return undefined
}

function treeFlatten<U extends TreeItem>(tree: U): U[] {
  const items: U[] = [tree]
  for (const child of tree.children ?? []) {
    items.push(...treeFlatten<U>(child as U))
  }
  return items
}

function treeSiblings<U extends TreeItem>(tree: U, fn: (item: U) => void) {
  if (tree.parent) {
    for (const sibling of (tree.parent.children as U[]) ?? []) {
      if (sibling !== tree) fn(sibling)
    }
  }
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
  const { form, submit, appliedAggregations } = useProductFiltersPro()

  const name = `filters.category_uid.in` as const
  const currentFilter = useWatch({ control: form.control, name })

  const treeWithCounts = useMemo(() => {
    // const categoryAgg = filterNonNullableKeys(
    //   aggregations?.find((agg) => agg?.attribute_code === 'category_uid')?.options,
    // )
    // const categoryTree = menuToTree(menu, uid)

    const currentCounts = filterNonNullableKeys(
      appliedAggregations?.find((agg) => agg?.attribute_code === 'category_uid')?.options,
      ['count'],
    )

    const rootCategory = menu?.items?.[0]
    if (!rootCategory) return []

    const tree = treeMap<TreeItem & CategoryTreeItem>(
      menuItemToTreeItem(rootCategory, undefined),
      (item) => {
        const countItem = currentCounts.find((i) => item.uid === i.value)
        return {
          ...item,
          title: item.name,
          value: item.url_path ?? '',
          selected: currentFilter?.includes(item.uid) ?? false,
          indent: (item.level ?? 1) - 2,
          count: countItem?.count ?? null,
        }
      },
    )

    const activeItem = treeFind(tree, (item) => currentFilter?.includes(item.uid) ?? false)

    if (activeItem) {
      // Make sure all parents are visible of the current selected item.
      treeParents(activeItem, (item) => {
        item.count = 0
      })

      // If the activeItem has children, hide all siblings
      if (activeItem.children.length > 0) {
        treeSiblings(activeItem, (item) => {
          if (item !== activeItem) item.count = null
        })
      }
    } else {
      // If there is no active item, only show one level deep
      tree.children.forEach((item) => {
        item.children = []
      })
    }

    return treeFlatten(tree).filter((item) => {
      if (item.indent <= -1) return true
      return item.count !== null
    })
  }, [appliedAggregations, currentFilter, menu])

  if (!menu) return null

  return (
    <ProductFiltersProCategoryAccordion
      categoryTree={treeWithCounts}
      {...props}
      onChange={async (item) => {
        form.setValue('filters', {
          category_uid: { in: item.uid === currentFilter?.[0] ? null : [item?.uid] },
        })
        await submit()
      }}
    />
  )
}
