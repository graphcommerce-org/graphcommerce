/* eslint-disable @typescript-eslint/no-explicit-any */
type RowColumnOneInput = {
  rowColumnOneVariant?: 'Default' | 'Message' | null | undefined
  colOne: {
    raw: any
  }
  __typename: string
}

export const rowColumnOneInput: RowColumnOneInput = {
  __typename: 'RowColumnOne',
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
