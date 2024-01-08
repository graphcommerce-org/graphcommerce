/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowColumnOneProps = {
  __typename: 'RowColumnOne'
  id?: string
  variant?: 'Default' | 'Message' | null | undefined
  copy: React.ReactNode
}

export const rowColumnOneInput = {
  __typename: 'RowColumnOne' as const,
  id: 'ckv6kbfhknt3h0c5946xpj83m',
  rowColumnOneVariant: null,
  colOne: {
    raw: {
      children: [
        {
          type: 'heading-two',
          children: [
            {
              text: 'Generieke heading',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'Dit is statische content',
            },
          ],
        },
      ],
    },
  },
}
