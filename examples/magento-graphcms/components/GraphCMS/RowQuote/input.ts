/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowQuoteProps = {
  __typename: string
  id: string
  quote: { raw: any }
}

export const rowQuoteInput: RowQuoteProps = {
  __typename: 'RowQuote',
  id: 'clpwlv5zhqhi809w2mh2mbmsl',
  quote: {
    raw: {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Dit is een quote',
            },
          ],
        },
      ],
    },
  },
}
