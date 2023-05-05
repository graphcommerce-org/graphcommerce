import { ProductListContext } from '@graphcommerce/magento-product'
import { extractUrlQuery, getFilterTypes, parseParams } from '@graphcommerce/magento-product/server'
import { GetStaticPropsContext } from 'next'

export type GetSearchContextReturn = Promise<{ productListContext: ProductListContext }>

export async function getSearchContext(
  context: GetStaticPropsContext<{ url: string[] }>,
): Promise<{ productListContext: ProductListContext }> {
  const [searchShort = '', query = []] = extractUrlQuery(context.params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const filterTypes = getFilterTypes()

  return {
    productListContext: {
      filterTypes: await filterTypes,
      params: parseParams(search ? `search/${search}` : 'search', query, await filterTypes, search),
    },
  }
}
