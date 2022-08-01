import { NavigationNode, NavigationNodeButton, NavigationNodeHref } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { MenuQueryFragment } from '../queries/MenuQueryFragment.gql'

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export type Item = NonNullable<NonNullable<MenuQueryFragment['menu']>['items']>[0]

export function categoryToNav(props: Item | null | undefined): NavigationNode | undefined {
  if (!props) return undefined
  const { uid, children, include_in_menu, name, url_path } = props

  if (!uid || include_in_menu !== 1 || !url_path || !name) return undefined

  // If we've got children we make a button that navigates to childitems.
  if (children && children.length > 0) {
    return {
      name,
      id: uid,
      childItems: [
        { name: i18n._(/* i18n */ 'All {name}', { name }), href: `/${url_path}`, id: `${uid}-all` },
        ...children.map(categoryToNav).filter(nonNullable),
      ],
    } as NavigationNodeButton
  }

  // If we've got no children we make a href.
  return { name, id: uid, href: `/${url_path}` } as NavigationNodeHref
}

/**
 * Converts the Magento GraphQL category tree to a NavigationNode tree, which can be used in the
 * Navigation component.
 */
export function useMagentoMenuToNavigation(menu: MenuQueryFragment['menu']) {
  return (menu?.items ?? []).map(categoryToNav).filter(nonNullable)
}
