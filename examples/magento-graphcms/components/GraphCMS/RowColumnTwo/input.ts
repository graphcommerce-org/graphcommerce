/* eslint-disable @typescript-eslint/no-explicit-any */
type RowColumnTwoInput = {
  colOne: {
    raw: any
  }
  colTwo: {
    raw: any
  }
  __typename: string
}

export const rowColumnTwoInput: RowColumnTwoInput = {
  __typename: 'RowColumnThree',
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
  colTwo: {
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
