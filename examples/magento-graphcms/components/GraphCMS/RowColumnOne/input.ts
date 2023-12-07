/* eslint-disable @typescript-eslint/no-explicit-any */
type RowColumnOneProps = {
  __typename: string
  id: string
  rowColumnOneVariant?: 'Default' | 'Message' | null | undefined
  colOne: {
    raw: any
  }
}

export const rowColumnOneInput: RowColumnOneProps = {
  __typename: 'RowColumnOne',
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
