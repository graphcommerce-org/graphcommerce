import type { AllRows } from '@graphcommerce/next-ui/Row/RowType'
import { RowColumnOneFragment, RowLinksFragment, RowQuoteFragment } from '../components'
import { parserMap } from './parserMap'

export type Input =
  | (RowColumnOneFragment & { __typename: 'RowColumnOne' })
  | (RowLinksFragment & { __typename: 'RowLinks' })
  | (RowQuoteFragment & { __typename: 'RowQuote' })

export function parseHygraphContentItem<K extends Input['__typename']>(
  input: Extract<Input, { __typename: K }>,
) {
  if (!input) return null
  if (parserMap[input.__typename as K]) {
    return parserMap[input.__typename as K](input)
  }
  return input
}

// export const parseHygraphContent = (input: Input[]) =>
//   input.map((item) => parseHygraphContentItem(item))
