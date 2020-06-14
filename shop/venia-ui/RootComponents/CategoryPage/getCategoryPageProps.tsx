import apolloClient from 'node/apolloClient'
import {
  FilterInputTypesDocument,
  CategoryPageDocument,
  CategoryProductsDocument,
} from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'
import getFilterInputTypes from './FilterInputTypes'

type GetCategoryPagePropsArguments = {
  query: string[]
  urlResolve: ReturnType<typeof getUrlResolveProps>
}

const filterTypeInputs: Array<
  'FilterEqualTypeInput' | 'FilterMatchTypeInput' | 'FilterRangeTypeInput'
> = ['FilterEqualTypeInput', 'FilterMatchTypeInput', 'FilterRangeTypeInput']

const parseCategoryFilterParams = (query: string[], introspectionData: GQLGetFilterInputsQuery) => {
  const typeMap: { [index: string]: typeof filterTypeInputs[0] } = {}

  introspectionData.__type.inputFields.forEach(({ name, type }) => {
    const typeName = type.name as typeof filterTypeInputs[0]
    if (!filterTypeInputs.includes(typeName)) {
      throw new Error(`filter ${name} with FilterTypeInput ${type.name} not implemented`)
    }
    typeMap[name] = typeName
  })

  const categoryVariables: Partial<GQLCategoryProductsQueryVariables> &
    Required<Pick<GQLCategoryProductsQueryVariables, 'filters'>> = {
    filters: {},
    sort: {},
  }

  query.reduce<string | undefined>((param, value) => {
    if (!param) return value

    if (param === 'page') categoryVariables.currentPage = Number(value)
    if (param === 'size') categoryVariables.pageSize = Number(param)

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

const getCategoryPageProps = async ({ query, urlResolve }: GetCategoryPagePropsArguments) => {
  const client = await apolloClient()

  const filterInputTypes = getFilterInputTypes()

  const category = client.query<GQLCategoryPageQuery, GQLCategoryPageQueryVariables>({
    query: CategoryPageDocument,
    variables: { id: (await urlResolve).urlResolver.id },
  })

  const filterParams = parseCategoryFilterParams(query, (await filterInputTypes).data)
  filterParams.filters.category_id = { eq: String((await urlResolve).urlResolver.id) }
  const products = client.query<GQLCategoryProductsQuery, GQLCategoryProductsQueryVariables>({
    query: CategoryProductsDocument,
    variables: filterParams,
  })

  return {
    ...(await category).data,
    ...(await products).data,
    filterParams: filterParams as GQLCategoryProductsQueryVariables,
    filterInputTypes: (await filterInputTypes).data,
  }
}

export default getCategoryPageProps

export type GetCategoryPageProps = PromiseValue<ReturnType<typeof getCategoryPageProps>>
