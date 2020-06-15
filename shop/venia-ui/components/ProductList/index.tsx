import { SetRequired } from 'type-fest'

export type ProductListParams = {
  url: string
} & SetRequired<GQLProductListQueryVariables, 'filters' | 'sort'>
