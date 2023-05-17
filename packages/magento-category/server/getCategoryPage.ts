import type { UpPage } from '@graphcommerce/framer-next-pages/types'
import { TypedDocumentNode } from '@graphcommerce/graphql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { FilterTypes, ProductListParams } from '@graphcommerce/magento-product'
import { extractUrlQuery, getFilterTypes, parseParams } from '@graphcommerce/magento-product/server'
import { GetStaticPropsContext } from 'next'
import { CategoryQueryFragment } from '../queries/CategoryQueryFragment.gql'

type SingleCategory<Q extends CategoryQueryFragment> = NonNullable<
  NonNullable<NonNullable<Q['categories']>['items']>[number]
>

export type GetCategoryPageResult<Q extends CategoryQueryFragment = CategoryQueryFragment> = {
  category: Promise<SingleCategory<Q> | null>
  params: Promise<ProductListParams>
  filterTypes: Promise<FilterTypes>
  up: Promise<UpPage>
}

export type CategoryPageResult<Q extends CategoryQueryFragment = CategoryQueryFragment> = {
  category: SingleCategory<Q> | null
  params: ProductListParams
  filterTypes: FilterTypes
  up: UpPage
}

export function getCategoryPage<Q extends CategoryQueryFragment>(
  document: TypedDocumentNode<Q, { url: string }>,
  context: GetStaticPropsContext,
): GetCategoryPageResult {
  const [url = '', query = []] = extractUrlQuery(context.params)
  const filterTypes = getFilterTypes()
  const paramsPromise = filterTypes.then((f) => parseParams(url, query, f))

  const categoryQuery = graphqlQuery(
    document,
    paramsPromise.then((p) => ({ variables: { url: p.url }, cache: 'no-cache' })),
  )

  const category = categoryQuery.then((res) => res.data.categories?.items?.[0] ?? null)

  const up = category.then((c) => {
    const { category_name, category_url_path } = c?.breadcrumbs?.[0] ?? {}
    return category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: `/`, title: 'Home' }
  })

  const params = paramsPromise.then(async (p) => {
    const filteredCategoryUid = p.filters.category_uid?.in?.[0]
    let uid = filteredCategoryUid

    if (!uid) {
      uid = (await category)?.uid ?? ''
      if (p) p.filters.category_uid = { in: [uid] }
    }
    return p
  })

  return {
    category,
    filterTypes,
    params,
    up,
  }
}
