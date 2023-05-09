import { ProductListParams } from '@graphcommerce/magento-product'
import { FilterTypes } from '@graphcommerce/magento-product/components/ProductListItems/filterTypes'
import { extractUrlQuery, getFilterTypes, parseParams } from '@graphcommerce/magento-product/server'
import { GetStaticPropsContext } from 'next'

export type GetSearchContextReturn = {
  params: Promise<ProductListParams>
  filterTypes: Promise<FilterTypes>
}

export type ResolvedGetSearchContextReturn = {
  params: ProductListParams
  filterTypes: FilterTypes
}

export function getSearchContext(
  context: GetStaticPropsContext<{ url: string[] }>,
): GetSearchContextReturn {
  const [searchShort = '', query = []] = extractUrlQuery(context.params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const filterTypes = getFilterTypes()

  return {
    filterTypes,
    params: filterTypes.then((f) =>
      parseParams(search ? `search/${search}` : 'search', query, f, search),
    ),
  }
}
