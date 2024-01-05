import { RowColumnOneProps, RowLinksProps, RowQuoteProps } from '@graphcommerce/row-renderer'
import { RowColumnOneFragment, RowLinksFragment, RowQuoteFragment } from '../components'

type ParserMap = {
  [K in ContentItem['__typename']]: (
    input: Extract<ContentItem, { __typename: K }>,
  ) => Extract<ContentItem, { __typename: K }>
}

export type ContentItem = {
  __typename: string
  [key: string]: unknown
}

export const parserMap = {
  RowLinks: (input: ContentItem & RowLinksFragment): RowLinksProps => {
    const {
      __typename,
      pageLinks: links,
      linksVariant: variant,
      rowLinksCopy: copy,
      ...rest
    } = input

    const output = {
      ...rest,
      __typename: __typename as RowLinksProps['__typename'],
      links,
      copy,
      variant,
    }

    return output
  },
  RowColumnOne: (input: ContentItem & RowColumnOneFragment): RowColumnOneProps => {
    const { __typename, colOne: copy, rowColumnOneVariant: variant, ...rest } = input

    const output = {
      ...rest,
      __typename: __typename as RowColumnOneProps['__typename'],
      copy,
      variant,
    }

    return output
  },
  RowQuote: (input: ContentItem & RowQuoteFragment): RowQuoteProps => {
    const { __typename, quote: copy, ...rest } = input

    const output = {
      ...rest,
      __typename: __typename as RowQuoteProps['__typename'],
      copy,
    }

    return output
  },
}

export function parseHygraphContentItem(input: ContentItem) {
  if (parserMap[input.__typename]) {
    console.log('PARSED CORRECTLY', input.__typename)
    return parserMap[input.__typename](input)
  }

  console.log('PARSED INCORRECTLY', input.__typename)

  return input
}

export const parseHygraphContent = (input: ContentItem[]) =>
  input.map((item) => parseHygraphContentItem(item))
