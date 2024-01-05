export type Input = {
  __typename: string
  [key: string]: unknown
}

export type Output = {
  __typename: string
  [key: string]: unknown
}

export type ParserMap = {
  [K in Input['__typename']]: (input: Input) => Output
}

export const parserMap: ParserMap = {
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

export function parseHygraphContentItem<K extends Input['__typename']>(input: Input) {
  if (!input) return input
  if (parserMap[input.__typename as K]) {
    return parserMap[input.__typename as K](input)
  }
  return input
}

export const parseHygraphContent = (input: Input[]) =>
  input.map((item) => parseHygraphContentItem(item))
