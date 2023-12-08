/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowQuoteProps = {
  __typename: string
  quote: { raw: any }
}

export const rowQuoteInput: RowQuoteProps = {
  __typename: 'RowQuote',
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
