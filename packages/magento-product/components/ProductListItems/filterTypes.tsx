import type {
  Exact,
  Maybe,
  Scalars,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@graphcommerce/graphql-mesh'

/** This is mainly based on ProductListQueryVariables */
export type ProductListParams = {
  pageSize?: Maybe<Scalars['Int']>
  currentPage?: Maybe<Scalars['Int']>
  filters: ProductAttributeFilterInput
  sort: ProductAttributeSortInput
  search?: Maybe<Scalars['String']>
  url: string
}

export type ProductFilterParams = {
  // pageSize?: Maybe<Scalars['Int']>
  currentPage: number
  filters: ProductAttributeFilterInput
  sort: keyof ProductAttributeSortInput | null
  dir: SortEnum | null
  search: string | null
  url: string
}

export function toFilterParams(params: ProductListParams): ProductFilterParams {
  const [sortKey] = Object.keys(params.sort) as [keyof ProductAttributeSortInput]
  const dir = params.sort[sortKey] as SortEnum | undefined

  return {
    ...params,
    sort: sortKey ?? null,
    dir: dir ?? null,
    currentPage: params.currentPage ?? 1,
    search: params.search ?? null,
  }
}

export function toProductListParams(params: ProductFilterParams): ProductListParams {
  const { sort, dir, ...rest } = params
  return { sort: sort ? { [sort]: dir } : {}, ...rest }
}

export type AnyFilterType = ProductAttributeFilterInput[keyof ProductAttributeFilterInput]

export function isFilterTypeEqual(filter?: unknown): filter is FilterEqualTypeInput {
  return Boolean(
    filter && ((filter as FilterEqualTypeInput).eq || (filter as FilterEqualTypeInput).in),
  )
}

export function isFilterTypeMatch(filter: AnyFilterType): filter is FilterMatchTypeInput {
  return Boolean(filter && (filter as FilterMatchTypeInput).match)
}

export function isFilterTypeRange(filter: AnyFilterType): filter is FilterRangeTypeInput {
  return Boolean(
    filter && ((filter as FilterRangeTypeInput).from || (filter as FilterRangeTypeInput).to),
  )
}

export type FilterTypes = Partial<Record<string, string>>
