import type { ApolloClient } from '@graphcommerce/graphql'
import type { CategoryBreadcrumbFragment } from '../components/CategoryBreadcrumb'
import type { CategoryChildrenFragment } from '../components/CategoryChildren/CategoryChildren.gql'
import { CategorySiblingsDocument } from '../components/CategoryChildren/CategorySiblings.gql'
import { findParentBreadcrumbItem } from './findParentBreadcrumbItem'

export function appendSiblingsAsChildren(
  categoryPromise: Promise<
    (CategoryBreadcrumbFragment & CategoryChildrenFragment) | null | undefined
  >,
  client: ApolloClient<object>,
) {
  return categoryPromise.then(async (cat) => {
    const parentUid = findParentBreadcrumbItem(cat)?.category_uid
    if (!cat || (cat?.children?.length ?? 0) > 0 || !parentUid) return

    const res = await client.query({
      query: CategorySiblingsDocument,
      variables: { parentUid },
    })
    cat.children = res.data.categories?.items
  })
}
