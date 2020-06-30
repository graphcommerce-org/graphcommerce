import apolloClient from 'node/apolloClient'
import { CategoryPageDocument, ProductListDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getFilterTypeMap from 'components/ProductList/getFilterTypeMap'
import { ProductListParams } from 'components/ProductList'

async function parseParams(
  url: string,
  query: string[],
  filterTypeMap: ReturnType<typeof getFilterTypeMap>,
) {
  const categoryVariables: ProductListParams = { url, filters: {}, sort: {} }

  const typeMap = await filterTypeMap
  query.reduce<string | undefined>((param, value) => {
    // We parse everything in pairs, every second loop we parse
    if (!param) return value

    if (param === 'page') categoryVariables.currentPage = Number(value)
    if (param === 'size') categoryVariables.pageSize = Number(param)
    if (param === 'sort') categoryVariables.sort[value] = 'ASC'
    if (param === 'dir') {
      const [sortBy] = Object.keys(categoryVariables.sort)
      if (sortBy) categoryVariables.sort[sortBy] = value as GQLSortEnum
    }

    const [from, to] = value.split('-')
    switch (typeMap[param]) {
      case 'FilterEqualTypeInput':
        categoryVariables.filters[param] = { eq: value } as GQLFilterEqualTypeInput
        break
      case 'FilterMatchTypeInput':
        categoryVariables.filters[param] = { match: value } as GQLFilterMatchTypeInput
        break
      case 'FilterRangeTypeInput':
        categoryVariables.filters[param] = {
          ...(from !== '*' && { from }),
          ...(to !== '*' && { to }),
        } as GQLFilterRangeTypeInput
        break
    }

    return undefined
  }, undefined)

  return categoryVariables
}

type GetCategoryPagePropsArguments = {
  url: string[]
  urlParams: string[]
  urlResolve: ReturnType<typeof getUrlResolveProps>
}

const getCategoryPageProps = async ({
  url,
  urlParams,
  urlResolve,
}: GetCategoryPagePropsArguments) => {
  const client = await apolloClient()

  const filterTypeMap = getFilterTypeMap()

  const category = client.query<GQLCategoryPageQuery, GQLCategoryPageQueryVariables>({
    query: CategoryPageDocument,
    variables: { id: String((await urlResolve).urlResolver.id) },
  })

  const params = parseParams(url.join('/'), urlParams, filterTypeMap)

  const products = client.query<GQLProductListQuery, GQLProductListQueryVariables>({
    query: ProductListDocument,
    variables: {
      ...(await params),
      filters: {
        category_id: { eq: String((await urlResolve).urlResolver.id) },
        ...(await params).filters,
      },
      rootCategory: String((await urlResolve).urlResolver.id),
    },
  })

  return {
    ...(await category).data,
    ...(await products).data,
    params: await params,
    filterTypeMap: await filterTypeMap,
  }
}

export default getCategoryPageProps

export type GetCategoryPageProps = PromiseValue<ReturnType<typeof getCategoryPageProps>>
