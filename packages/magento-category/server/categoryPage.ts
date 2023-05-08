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
    category: Promise<SingleCategory<Q> | null>
    productListContext: Promise<ProductListContext>
    up: Promise<UpPage>
  }>

export function getCategoryPage<Q extends CategoryQueryFragment>(
  document: TypedDocumentNode<Q, { url: string }>,
  context: GetStaticPropsContext<{ url: string[] }>,
): GetCategoryPageResult {
  const [url = '', query = []] = extractUrlQuery(context.params)
  const filterTypesPromise = getFilterTypes()
  const paramsPromise = filterTypesPromise.then((f) => parseParams(url, query, f))

  const categoryQuery = graphqlQuery(
    document,
    paramsPromise.then((p) => ({ variables: { url: p.url } })),
  )

  const category = categoryQuery.then((res) => res.data.categories?.items?.[0] ?? null)

  const up = category.then((c) => {
    const { category_name, category_url_path } = c?.breadcrumbs?.[0] ?? {}
    return category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: `/`, title: 'Home' }
  })

  const productListContext = Promise.all([filterTypesPromise, paramsPromise]).then(
    async ([filterTypes, params]) => {
      const filteredCategoryUid = params.filters.category_uid?.in?.[0]
      let uid = filteredCategoryUid

      if (!uid) {
        uid = (await category)?.uid ?? ''
        if (params) params.filters.category_uid = { in: [uid] }
      }
      return { filterTypes, params }
    },
  )

  return { category, productListContext, up }
}
