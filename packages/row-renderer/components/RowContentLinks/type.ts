/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowContentLinksProps = {
  __typename: 'RowContentLinks'
  id?: string
  title: string
  links: Array<{
    id: string
    title: string
    url: string
    description?: React.ReactNode
    asset?: {
      url: string
      width?: number | null
      height?: number | null
      mimeType?: string | null
      size?: number | null
      alt?: string | null
    } | null
  }>
}

export const rowContentLinksInput: RowContentLinksProps = {
  __typename: 'RowContentLinks',
  id: 'clpwlv5zhqhi809w2mh2mbmsl',
  title: 'Generic content',
  contentLinks: [
    {
      id: 'ckih6zb3k5l2g09586mwwcktu',
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/',
      description: null,
      asset: {
        url: 'https://media.graphassets.com/NazgnwlaRq0kreX0I42o',
        width: 24,
        height: 24,
        mimeType: 'image/svg+xml',
        size: 1367,
        alt: null,
      },
    },
    {
      id: 'ckiqkenvs1diu0a05t2scemj6',
      title: 'Twitter',
      url: 'https://twitter.com/graphcommerce',
      description: null,
      asset: {
        url: 'https://media.graphassets.com/CKqkOdh9T6OWSpbQ6YQL',
        width: 24,
        height: 24,
        mimeType: 'image/svg+xml',
        size: 1746,
        alt: null,
      },
    },
  ],
}
