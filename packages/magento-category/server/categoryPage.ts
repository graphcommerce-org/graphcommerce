import type { UpPage } from '@graphcommerce/framer-next-pages/types'
import { TypedDocumentNode } from '@graphcommerce/graphql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { ProductListContext } from '@graphcommerce/magento-product'
import { extractUrlQuery, getFilterTypes, parseParams } from '@graphcommerce/magento-product/server'
import { GetStaticPropsContext } from 'next'
import type { Simplify } from 'type-fest'
import { CategoryQueryFragment } from '../queries/CategoryQueryFragment.gql'

type SingleCategory<Q extends CategoryQueryFragment> = NonNullable<
  NonNullable<NonNullable<Q['categories']>['items']>[number]
>

export type GetCategoryPageResult<Q extends CategoryQueryFragment = CategoryQueryFragment> =
  Simplify<{
    category: Promise<SingleCategory<Q> | undefined | null>
    productListContext: ProductListContext
    up: Promise<UpPage>
  }>

export async function getCategoryPage<Q extends CategoryQueryFragment>(
  document: TypedDocumentNode<Q, { url: string }>,
  context: GetStaticPropsContext<{ url: string[] }>,
): Promise<GetCategoryPageResult> {
  const [url = '', query = []] = extractUrlQuery(context.params)
  const filterTypes = getFilterTypes()
  const params = parseParams(url, query, await filterTypes)

  const categoryQuery = graphqlQuery(document, { variables: { url: params.url } })
  const category = categoryQuery.then((res) => res.data.categories?.items?.[0])

  const filteredCategoryUid = params.filters.category_uid?.in?.[0]
  let uid = filteredCategoryUid

  if (!uid) {
    uid = (await category)?.uid ?? ''
    if (params) params.filters.category_uid = { in: [uid] }
  }

  const up = category.then((c) => {
    const { category_name, category_url_path } = c?.breadcrumbs?.[0] ?? {}
    return category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: `/`, title: 'Home' }
  })

  return {
    category,
    productListContext: { filterTypes: await filterTypes, params },
    up,
  }
}
