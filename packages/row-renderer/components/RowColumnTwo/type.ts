/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowColumnTwoProps = {
  __typename: 'RowColumnTwo'
  id?: string
  copy: React.ReactNode
  copyTwo: React.ReactNode
}

export const rowColumnTwoInput: RowColumnTwoProps = {
  __typename: 'RowColumnTwo',
  id: 'clpwlv5zhqhi809w2mh2mbmsl',
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
