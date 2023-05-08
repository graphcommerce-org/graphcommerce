import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { ProductListParams } from '@graphcommerce/magento-product'
import { CategorySearchDocument, CategorySearchQuery } from '../CategorySearch.gql'

export type GetSearchCategoriesReturn = {
  categories: Promise<CategorySearchQuery['categories'] | null>
}

export function getSearchCategories(
  paramsPromise: Promise<ProductListParams>,
): GetSearchCategoriesReturn {
  return {
    categories: paramsPromise.then(async (params) => {
      if (!params.search) return null

      return (
        (await graphqlQuery(CategorySearchDocument, { variables: { search: params.search } })).data
          .categories ?? null
      )
    }),
  }
}
