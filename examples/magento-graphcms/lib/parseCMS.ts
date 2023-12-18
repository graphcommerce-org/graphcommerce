import { RowColumnOneFragment } from '../components/GraphCMS/RowColumnOne/RowColumnOne.gql'
import { RowLinksFragment } from '../components/GraphCMS/RowLinks/RowLinks.gql'
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
  if (isColumnOne(input)) {
    console.log('isColumnOne')

    const { colOne: copy, ...rest } = input
    const output = {
      ...rest,
      copy,
    }

    return output
  }

  if (isRowLinks(input)) {
    console.log('isRowLinks')

    const { pageLinks: links, rowLinksCopy: copy, ...rest } = input
    const output = {
      ...rest,
      links,
      copy,
    }

    return output
  }

  if (isQuote(input)) {
    console.log('isQuote')

    const { quote: copy, ...rest } = input
    const output = {
      ...rest,
      copy,
    }

    return output
  }

  return input
}
