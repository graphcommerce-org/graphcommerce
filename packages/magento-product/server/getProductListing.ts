import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { storeConfig } from '@graphcommerce/magento-store/server'
import { ProductListParams } from '../components'
import { ProductListDocument } from '../components/ProductList/ProductList.gql'
import { ProductFiltersDocument } from '../components/ProductListFilters/ProductFilters.gql'

export async function getProductListItems(params: Promise<ProductListParams> | ProductListParams) {
  return graphqlQuery(ProductListDocument, {
    variables: {
      pageSize: (await storeConfig()).grid_per_page ?? 24,
      ...(await params),
    },
  })
}

export async function getProductListFilters(
  params: Promise<ProductListParams> | ProductListParams,
) {
  const {
    search,
    filters: { category_uid },
  } = await params

  return graphqlQuery(ProductFiltersDocument, {
    variables: search ? { search } : { filters: { category_uid } },
  })
}
