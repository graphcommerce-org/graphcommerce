import type {
  NavigationNode,
  NavigationNodeButton,
  NavigationNodeHref,
} from '@graphcommerce/next-ui'
import { NavigationNodeType, nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { LayoutQuery } from '../../graphql/Layout.gql'

type MenuItems = NonNullable<LayoutQuery['menu']>['items']
type Item = NonNullable<MenuItems>[0]

function categoryToNav(
  props: Item | null | undefined,
  storePrefix: string,
): NavigationNode | undefined {
  if (!props) return undefined
  const { uid, children, include_in_menu, name, url_path } = props

  if (!uid || include_in_menu !== 1 || !name) return undefined

  const allName = <Trans>All {name}</Trans>
  // If we've got children we make a button that navigates to childitems.
  if (children && children.length > 0) {
    const button: NavigationNodeButton = {
      type: NavigationNodeType.BUTTON,
      href: url_path ? `/${storePrefix}/${url_path}` : undefined,
      name,
      id: uid,
      childItems: [
        ...(url_path
          ? [
              {
                name: allName,
                href: `/${storePrefix}/${url_path}`,
                id: `${uid}-all`,
              },
            ]
          : []),
        ...children.map((child) => categoryToNav(child, storePrefix)).filter(nonNullable),
      ],
    }
    return button
  }

  // If we've got no children we make a href.
  return {
    name,
    id: uid,
    href: `/${storePrefix}/${url_path}`,
  } as NavigationNodeHref
}

/**
 * Converts the Magento GraphQL category tree to a NavigationNode tree App Router version that adds
 * the store prefix to all hrefs
 */
export function magentoMenuToNavigation(
  menu: LayoutQuery['menu'],
  includeRoot: boolean,
  storePrefix: string,
) {
  return ((includeRoot ? menu?.items : menu?.items?.[0]?.children) || [])
    .map((child) => categoryToNav(child, storePrefix))
    .filter(nonNullable)
}
