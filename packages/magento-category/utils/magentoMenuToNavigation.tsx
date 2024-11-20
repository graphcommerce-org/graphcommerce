import type {
  NavigationNode,
  NavigationNodeButton,
  NavigationNodeHref,
} from '@graphcommerce/next-ui'
import { NavigationNodeType, nonNullable } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import type { MenuQueryFragment } from '../queries/MenuQueryFragment.gql'
import type { NavigationItemFragment } from '../queries/NavigationItem.gql'

type Item = NonNullable<NonNullable<NonNullable<MenuQueryFragment['menu']>['items']>[0]>

export type MagentoNavigationItemProps = NavigationItemFragment

function categoryToNav(
  props: Item | null | undefined,
  Component?: React.ComponentType<MagentoNavigationItemProps>,
): NavigationNode | undefined {
  if (!props) return undefined
  const { uid, children, include_in_menu, name, url_path, level } = props

  if (!uid || include_in_menu !== 1 || !name) return undefined

  const allName = i18n._(/* i18n */ 'All {name}', { name })
  // If we've got children we make a button that navigates to childitems.
  if (children && children.length > 0) {
    const button: NavigationNodeButton = {
      type: NavigationNodeType.BUTTON,
      href: url_path ? `/${url_path}` : undefined,
      name: Component ? <Component key={uid} {...props} /> : name,
      id: uid,
      childItems: [
        ...(url_path
          ? [
              {
                name: Component ? (
                  <Component key={uid} {...props} name={allName} level={(level ?? 0) + 1} />
                ) : (
                  allName
                ),
                href: `/${url_path}`,
                id: `${uid}-all`,
              },
            ]
          : []),
        ...children.map((child) => categoryToNav(child, Component)).filter(nonNullable),
      ],
    }
    return button
  }

  // If we've got no children we make a href.
  return {
    name: Component ? <Component key={uid} {...props} /> : name,
    id: uid,
    href: `/${url_path}`,
  } as NavigationNodeHref
}

/**
 * Converts the Magento GraphQL category tree to a NavigationNode tree, which can be used in the
 * Navigation component.
 *
 * To provide a custom renderer to the navigation items, pass a component as the third argument;
 *
 * ```tsx
 * function MagentoNavigationItem(props: MagentoNavigationItemProps) {
 *   const { name, level } = props
 *   return (
 *     <>
 *       {name} {level}
 *     </>
 *   )
 * }
 * ```
 */
export function magentoMenuToNavigation(
  menu: MenuQueryFragment['menu'],
  includeRoot: boolean,
  Component?: React.ComponentType<MagentoNavigationItemProps>,
) {
  return ((includeRoot ? menu?.items : menu?.items?.[0]?.children) || [])
    .map((child) => categoryToNav(child, Component))
    .filter(nonNullable)
}
