/* eslint-disable @typescript-eslint/no-explicit-any */
type RowColumnOneProps = {
  rowColumnOneVariant?: 'Default' | 'Message' | null | undefined
  colOne: {
    raw: any
  }
  __typename: string
}

export const rowColumnOneInput: RowColumnOneProps = {
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
