import { graphqlSsrClient } from '@graphcommerce/graphql-mesh'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ProductListDocument,
  ProductListQueryVariables,
} from '../components/ProductList/ProductList.gql'
import {
  ProductFiltersDocument,
  ProductFiltersQueryVariables,
} from '../components/ProductListFilters/ProductFilters.gql'

export async function productList(locale: string, listVariables: ProductListQueryVariables) {
  const client = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument, fetchPolicy: 'cache-first' })
  const pageSize = (await conf).data.storeConfig?.grid_per_page ?? 24
  return client.query({ query: ProductListDocument, variables: { pageSize, ...listVariables } })
}

export async function productFilters(
  locale: string,
  filterVariables: ProductFiltersQueryVariables,
) {
  const client = graphqlSsrClient(locale)
  return client.query({ query: ProductFiltersDocument, variables: filterVariables })
}
