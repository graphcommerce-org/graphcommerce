/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowButtonLinkListProps = {
  __typename: 'RowButtonLinkList'
  id?: string
  title: string
  links: Array<{ title?: string | null; url: string }>
}

export const rowButtonLinkListInput: RowButtonLinkListProps = {
  __typename: 'RowButtonLinkList',
  id: 'clpwlv5zhqhi809w2mh2mbmsl',
  title: 'Generic Button Link List',
  links: [
    {
      title: 'Generic Button Link 1',
      url: 'https://www.example.com',
    },
    {
      title: 'Generic Button Link 2',
      url: 'https://www.example.com',
    },
  ],
}
