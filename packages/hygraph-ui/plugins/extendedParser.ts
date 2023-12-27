import type { MethodPlugin } from '@graphcommerce/next-config'
import { AllRows, RowColumnTwoProps } from '@graphcommerce/next-ui'
import { Input, parseHygraphContentItem } from '../lib'
import { RowColumnTwoFragment } from '../components/RowColumnTwo/RowColumnTwo.gql'
import { parserMap } from '../lib/parserMap'

export const func = 'parseHygraphContentItem'
export const exported = '@graphcommerce/graphcms-ui/lib/parser'

type ExtendedInput = Input | (RowColumnTwoFragment & { __typename: 'RowColumnTwo' })
type ExtendedOutput = RowColumnTwoProps

type FunctionMapType = {
  [K in ExtendedInput['__typename']]: (
    input: Extract<ExtendedInput, { __typename: K }>,
  ) => Extract<AllRows | ExtendedOutput, { __typename: K }>
}

const extendedParserMap: FunctionMapType = {
  ...parserMap,
  RowColumnTwo: (input) => {
    const { colOne: copy, colTwo: copyTwo } = input

    const output = {
      ...input,
      copy,
      copyTwo,
    }

    return output
  },
}

const extendParser: MethodPlugin<typeof parseHygraphContentItem> = <
  K extends ExtendedInput['__typename'],
>(
  prev,
  input,
) => {
  console.log('extendHygraphParser', input)
  if (!input) return null

  if (extendedParserMap[input.__typename as K]) {
    return extendedParserMap[input.__typename as K](input)
  }
  return prev(input)
}

export const plugin = extendParser
