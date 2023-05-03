import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ProductListDocument,
  ProductListQueryVariables,
} from '../components/ProductList/ProductList.gql'
import {
  ProductFiltersDocument,
  ProductFiltersQueryVariables,
} from '../components/ProductListFilters/ProductFilters.gql'

export async function productList(variables: ProductListQueryVariables) {
  const conf = graphqlQuery(StoreConfigDocument, { fetchPolicy: 'cache-first' })
  const pageSize = (await conf).data.storeConfig?.grid_per_page ?? 24
  return graphqlQuery(ProductListDocument, { variables: { pageSize, ...variables } })
}

export async function productFilters(variables: ProductFiltersQueryVariables) {
  return graphqlQuery(ProductFiltersDocument, { variables })
}
