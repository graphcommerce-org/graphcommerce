/**
 * This is mainly based on GQLProductListQueryVariables
 */
export type ProductListParams = Exact<{
  pageSize?: Maybe<Scalars['Int']>
  currentPage?: Maybe<Scalars['Int']>
  filters: GQLProductAttributeFilterInput
  sort: GQLProductAttributeSortInput
  search?: Maybe<Scalars['String']>
  url: string
}>

type AnyFilterType =
  | GQLFilterEqualTypeInput
  | GQLFilterMatchTypeInput
  | GQLFilterRangeTypeInput
  | undefined

export function isFilterTypeEqual(filter: AnyFilterType): filter is GQLFilterEqualTypeInput {
  return Boolean(
    filter && ((filter as GQLFilterEqualTypeInput).eq || (filter as GQLFilterEqualTypeInput).in),
  )
}

export function isFilterTypeMatch(filter: AnyFilterType): filter is GQLFilterMatchTypeInput {
  return Boolean(filter && (filter as GQLFilterMatchTypeInput).match)
}

export function isFilterTypeRange(filter: AnyFilterType): filter is GQLFilterRangeTypeInput {
  return Boolean(
    filter && ((filter as GQLFilterRangeTypeInput).from || (filter as GQLFilterRangeTypeInput).to),
  )
}

export type AllFilterInputTypes =
  | 'FilterEqualTypeInput'
  | 'FilterMatchTypeInput'
  | 'FilterRangeTypeInput'

export type FilterTypeMap = {
  [index: string]: AllFilterInputTypes
}
