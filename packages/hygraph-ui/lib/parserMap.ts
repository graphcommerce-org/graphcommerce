import { AllRows } from '@graphcommerce/next-ui'
import { Input } from './parser'

/**
 * Matches the input with the correct parse function and return types.
 *
 * This file needs to be outside './parser' to avoid overwriting with plugins.
 */
export type FunctionMapType = {
  [K in Input['__typename']]: (
    input: Extract<Input, { __typename: K }>,
  ) => Extract<AllRows, { __typename: K }>
}

export const parserMap: FunctionMapType = {
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

    // Potential fix
    // const { colOne, rowColumnOneVariant, ...rest } = input
    // const output = {
    //   ...rest,
    //   copy: colOne ?? rest?.copy,
    //   variant: rowColumnOneVariant ?? rest?.variant,
    // }

    console.log('input:', input)
    console.log('output:', output)

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
