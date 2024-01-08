/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowQuoteProps = {
  __typename: 'RowQuote'
  id?: string
  copy: React.ReactNode | null
}

export const rowQuoteInput = {
  __typename: 'RowQuote' as const,
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
