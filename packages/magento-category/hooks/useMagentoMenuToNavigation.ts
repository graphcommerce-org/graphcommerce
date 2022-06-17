// eslint-disable-next-line import/no-extraneous-dependencies
import { Maybe } from '@graphcommerce/graphql-mesh'
import { NavigationNode } from '@graphcommerce/next-ui/Navigation/components/Navigation'
import { MenuQueryFragment } from '../queries/MenuQueryFragment.gql'

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

type Item = NonNullable<NonNullable<MenuQueryFragment['menu']>['items']>[0]

function categoryToNav(props: Maybe<Item> | undefined): NavigationNode | undefined {
  if (!props) return undefined
  const { uid, children_count, children, include_in_menu, name, url_path } = props

  if (!uid || include_in_menu !== 1 || !url_path || !name) return undefined

  return {
    name,
    id: uid,
    href: url_path,
    childItems:
      (children?.length ?? 0) > 0 ? children?.map(categoryToNav).filter(nonNullable) : undefined,
  }
}

export function useMagentoMenuToNavigation(menu: MenuQueryFragment['menu']) {
  return (menu?.items ?? []).map(categoryToNav).filter(nonNullable)
}
