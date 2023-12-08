/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowColumnThreeProps = {
  __typename: 'RowColumnThree'
  id: string
  colOne: {
    raw: any
  }
  colTwo: {
    raw: any
  }
  colThree: {
    raw: any
  }
}

export const rowColumnThreeInput: RowColumnThreeProps = {
  __typename: 'RowColumnThree',
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
  colThree: {
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
