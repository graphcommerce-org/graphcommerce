import type { UpPage } from '@graphcommerce/framer-next-pages/types'
import { TypedDocumentNode } from '@graphcommerce/graphql'
import { graphqlQuery, graphqlSharedClient } from '@graphcommerce/graphql-mesh'
import {
  extractUrlQuery,
  FilterTypes,
  getFilterTypes,
  parseParams,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import { productFilters, productList } from '@graphcommerce/magento-product/server'
import { GetStaticPropsContext } from 'next'
import { CategoryQueryFragment } from '../queries/CategoryQueryFragment.gql'

type SingleCategory<Q extends CategoryQueryFragment> = NonNullable<
  NonNullable<NonNullable<Q['categories']>['items']>[number]
>

// type Products = SetRequired<ProductListQuery, 'products'>
// type Filters = SetRequired<ProductFiltersQuery, 'filters'>

export type CategoryNotFound<Q extends CategoryQueryFragment> = Q &
  ProductListQuery &
  ProductFiltersQuery & {
    params?: undefined
    filterTypes?: undefined
    up?: UpPage
  }

export type CategoryFound<Q extends CategoryQueryFragment> = Q &
  ProductListQuery &
  ProductFiltersQuery & {
    params: ProductListParams
    filterTypes: FilterTypes
    up: UpPage
  }

export type CategoryPageProps<Q extends CategoryQueryFragment> = CategoryNotFound | CategoryFound<Q>

type CategoryPagePropsReturn<Q extends CategoryQueryFragment> = {
  category: Promise<SingleCategory<Q> | null | undefined>
  props: Promise<CategoryPageProps<Q>>
}

/** Fetches all category, filter and product data required for a category page. */
export function categoryPageProps<Q extends CategoryQueryFragment>(
  document: TypedDocumentNode<Q, { url: string }>,
  context: GetStaticPropsContext<{ url: string[] }>,
): CategoryPagePropsReturn<Q> {
  const [url, query] = extractUrlQuery(context.params)
  if (!url) throw Error('No url found in params')

  const categoryQuery = graphqlQuery(document, { variables: { url } })
  const category = categoryQuery.then((res) => res.data.categories?.items?.[0])

  // We're immediately returning the category promise, so that other processes can kick off.
  return {
    category,
    props: (async () => {
      const filterTypes = getFilterTypes(graphqlSharedClient())
      const productListParams = parseParams(url, query, await filterTypes)

      const filteredCategoryUid =
        productListParams && productListParams.filters.category_uid?.in?.[0]

      let uid = filteredCategoryUid
      if (!uid) {
        uid = (await category)?.uid ?? ''
        if (productListParams) productListParams.filters.category_uid = { in: [uid] }
      }

      // Can not find a category
      if (!productListParams || !uid) return {}

      const filters = productFilters({ filters: { category_uid: { eq: uid } } })
      const products = productList({
        ...productListParams,
        filters: { ...productListParams.filters, category_uid: { eq: uid } },
      })

      const up = category.then((c) => {
        const { category_name, category_url_path } = c?.breadcrumbs?.[0] ?? {}
        return category_url_path && category_name
          ? { href: `/${category_url_path}`, title: category_name }
          : { href: `/`, title: 'Home' }
      })

      // Can not find any products
      const cat = await category
      if ((await products).errors || !cat) return {}

      return {
        ...(await products).data,
        ...(await categoryQuery).data,
        ...(await filters).data,
        filterTypes: await filterTypes,
        params: productListParams,
        up: await up,
      } satisfies CategoryFound<Q>
    })(),
  }
}
