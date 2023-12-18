import { RowColumnOneFragment } from '../components/GraphCMS/RowColumnOne/RowColumnOne.gql'
import { RowLinksFragment } from '../components/GraphCMS/RowLinks/RowLinks.gql'
import { RowQuoteFragment } from '../components/GraphCMS/RowQuote/RowQuote.gql'

type Inputs = (RowColumnOneFragment | RowLinksFragment | RowQuoteFragment) & {
  __typename: string
}

function isColumnOne(input: Inputs): input is RowColumnOneFragment & Pick<Inputs, '__typename'> {
  return input.__typename === 'RowColumnOne'
}

function isRowLinks(input: Inputs): input is RowLinksFragment & Pick<Inputs, '__typename'> {
  return input.__typename === 'RowLinks'
}

function isQuote(input: Inputs): input is RowQuoteFragment & Pick<Inputs, '__typename'> {
  return input.__typename === 'RowQuote'
}

export const parseHygraphOutput = (input: Inputs) => {
  if (isColumnOne(input)) {
    console.log('isColumnOne')

    const { colOne, ...rest } = input
    const copy = colOne
    const output = {
      ...rest,
      copy,
    }

    return output
  }

  if (isRowLinks(input)) {
    console.log('isColumnOne')
  }

  if (isQuote(input)) {
    console.log('isQuote')
  }

  return input
}
