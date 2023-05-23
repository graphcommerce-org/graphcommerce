import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { storeConfig } from '@graphcommerce/magento-store/server'
import { ProductListParams } from '../components'
import { ProductListDocument } from '../components/ProductList/ProductList.gql'
import { ProductFiltersDocument } from '../components/ProductListFilters/ProductFilters.gql'

export async function getPageSize(params: Promise<ProductListParams> | ProductListParams) {
  return (await params).pageSize ?? (await storeConfig()).grid_per_page ?? 24
}

export async function getProductListItems(params: Promise<ProductListParams> | ProductListParams) {
  return graphqlQuery(ProductListDocument, {
    cache: 'no-cache',
    variables: {
      ...(await params),
      pageSize: await getPageSize(params),
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
    cache: 'no-cache',
    variables: search ? { search } : { filters: { category_uid } },
  })
}
