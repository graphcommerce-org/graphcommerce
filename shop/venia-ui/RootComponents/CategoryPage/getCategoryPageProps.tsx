import apolloClient from 'node/apolloClient'
import {
  CategoryPageDocument,
  CategorypageStoreConfigDocument,
  ProductListDocument,
} from 'generated/apollo'
import { PromiseValue, SetRequired } from 'type-fest'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'

import getFilterInputTypes, { FilterInputTypesQuery } from './getFilterInputTypes'

const filterTypeInputs: Array<
  'FilterEqualTypeInput' | 'FilterMatchTypeInput' | 'FilterRangeTypeInput'
> = ['FilterEqualTypeInput', 'FilterMatchTypeInput', 'FilterRangeTypeInput']

const parseProductListParams = async (
  query: string[],
  urlResolve: Promise<GQLResolveUrlQuery>,
  filterInputTypes: Promise<FilterInputTypesQuery>,
) => {
  const typeMap: { [index: string]: typeof filterTypeInputs[0] } = {}

  ;(await filterInputTypes).__type.inputFields.forEach(({ name, type }) => {
    const typeName = type.name as typeof filterTypeInputs[0]
    if (!filterTypeInputs.includes(typeName)) {
      throw new Error(`filter ${name} with FilterTypeInput ${type.name} not implemented`)
    }
    typeMap[name] = typeName
  })

  const categoryVariables: SetRequired<GQLProductListQueryVariables, 'filters' | 'sort'> = {
    filters: { category_id: { eq: String((await urlResolve).urlResolver.id) } },
    sort: {},
  }

  query.reduce<string | undefined>((param, value) => {
    if (!param) return value

    if (param === 'page') categoryVariables.currentPage = Number(value)
    if (param === 'size') categoryVariables.pageSize = Number(param)
    if (param === 'sort') categoryVariables.sort[value] = 'ASC'
    if (param === 'dir') {
      const [sortBy] = Object.keys(categoryVariables.sort)
      if (sortBy) categoryVariables.sort[sortBy] = value
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
        categoryVariables.filters[param] = { from, to } as GQLFilterRangeTypeInput
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

  const filterInputTypes = getFilterInputTypes()

  const storeConfig = client.query<GQLCategorypageStoreConfigQuery>({
    query: CategorypageStoreConfigDocument,
  })

  const category = client.query<GQLCategoryPageQuery, GQLCategoryPageQueryVariables>({
    query: CategoryPageDocument,
    variables: { id: (await urlResolve).urlResolver.id },
  })

  const productListParams = parseProductListParams(urlParams, urlResolve, filterInputTypes)

  const products = client.query<GQLProductListQuery, GQLProductListQueryVariables>({
    query: ProductListDocument,
    variables: await productListParams,
  })

  return {
    url,
    ...(await category).data,
    ...(await products).data,
    ...(await storeConfig).data,
    productListParams: await productListParams,
    filterInputTypes: await filterInputTypes,
  }
}

export default getCategoryPageProps

export type GetCategoryPageProps = PromiseValue<ReturnType<typeof getCategoryPageProps>>
