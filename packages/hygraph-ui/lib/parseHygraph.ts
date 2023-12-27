import type { AllRows } from '@graphcommerce/next-ui/Row/RowType'
import { RowColumnOneFragment, RowLinksFragment, RowQuoteFragment } from '../components'

type Input =
  | (RowColumnOneFragment & { __typename: 'RowColumnOne' })
  | (RowLinksFragment & { __typename: 'RowLinks' })
  | (RowQuoteFragment & { __typename: 'RowQuote' })

/**
 * Matches the input with the correct parse function and return types.
 */
type FunctionMapType = {
  [K in Input['__typename']]: (
    input: Extract<Input, { __typename: K }>,
  ) => Extract<AllRows, { __typename: K }>
}

const functionMap: FunctionMapType = {
  RowLinks: (input) => {
    const { pageLinks: links, linksVariant: variant, rowLinksCopy: copy, ...rest } = input
    const output = {
      ...rest,
      links,
      copy,
      variant,
    }

    return output
  },
  RowColumnOne: (input) => {
    const { colOne: copy, rowColumnOneVariant: variant, ...rest } = input
    const output = {
      ...rest,
      copy,
      variant,
    }

    return output
  },
  RowQuote: (input) => {
    const { quote: copy, ...rest } = input
    const output = {
      ...rest,
      copy,
    }

    return output
  },
}

export function parseHygraphContentItem<K extends Input['__typename']>(
  input: Extract<Input, { __typename: K }>,
) {
  if (!input) return null
  if (functionMap[input.__typename as K]) {
    return functionMap[input.__typename as K](input)
  }
  return input
}

// export const parseHygraphContent = (input: Input[]) =>
//   input.map((item) => parseHygraphContentItem(item))
