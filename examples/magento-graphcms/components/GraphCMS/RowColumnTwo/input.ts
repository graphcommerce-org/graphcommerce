/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowColumnTwoProps = {
  __typename: string
  colOne: {
    raw: any
  }
  colTwo: {
    raw: any
  }
}

export const rowColumnTwoInput: RowColumnTwoProps = {
  __typename: 'RowColumnTwo',
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
