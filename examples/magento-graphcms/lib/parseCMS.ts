// import { RowColumnOneFragment } from '../components/GraphCMS/RowColumnOne/RowColumnOne.gql'
import { RowColumnOneFragment, RowLinksFragment } from '@graphcommerce/next-ui'
import { RowQuoteFragment } from '../components/GraphCMS/RowQuote/RowQuote.gql'

type Inputs =
  | (RowColumnOneFragment & { __typename: 'RowColumnOne' })
  | (RowLinksFragment & { __typename: 'RowLinks' })
  | (RowQuoteFragment & { __typename: 'RowQuote' })

function isColumnOne(
  input: Inputs,
): input is RowColumnOneFragment & { __typename: 'RowColumnOne' } {
  return input.__typename === 'RowColumnOne'
}

function isRowLinks(input: Inputs): input is RowLinksFragment & { __typename: 'RowLinks' } {
  return input.__typename === 'RowLinks'
}

function isQuote(input: Inputs): input is RowQuoteFragment & { __typename: 'RowQuote' } {
  return input.__typename === 'RowQuote'
}

export const parseHygraph = (input: Inputs) => {
  if (isColumnOne(input, input)) {
    console.log('isColumnOne')

    const { colOne: copy, rowColumnOneVariant: variant, ...rest } = input
    const output = {
      ...rest,
      copy,
      variant,
    }

    return output
  }

  if (isRowLinks(input)) {
    console.log('isRowLinks', input)

    const { pageLinks: links, linksVariant: variant, rowLinksCopy: copy, ...rest } = input
    const output = {
      ...rest,
      links,
      copy,
      variant,
    }

    return output
  }

  if (isQuote(input)) {
    console.log('isQuote', input)

    const { quote: copy, ...rest } = input
    const output = {
      ...rest,
      copy,
    }

    return output
  }

  return input
}
