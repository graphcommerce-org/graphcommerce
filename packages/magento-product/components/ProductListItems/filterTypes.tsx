import type {
  Exact,
  Maybe,
  Scalars,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
} from '@graphcommerce/graphql-mesh'

/** This is mainly based on ProductListQueryVariables */
export type ProductListParams = Exact<{
  pageSize?: Maybe<Scalars['Int']>
  currentPage?: Maybe<Scalars['Int']>
  filters: ProductAttributeFilterInput
  sort: ProductAttributeSortInput
  search?: Maybe<Scalars['String']>
  url: string
}>

type AnyFilterType = FilterEqualTypeInput | FilterMatchTypeInput | FilterRangeTypeInput | undefined

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

export type AllFilterInputTypes =
  | 'FilterEqualTypeInput'
  | 'FilterMatchTypeInput'
  | 'FilterRangeTypeInput'

export type FilterTypes = Partial<Record<string, AllFilterInputTypes>>
