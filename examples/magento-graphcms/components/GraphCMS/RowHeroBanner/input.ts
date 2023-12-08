/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowHeroBannerProps = {
  __typename: 'RowHeroBanner'
  id: string
  heroAsset: {
    url: string
    width?: number | null
    height?: number | null
    mimeType?: string | null
    size?: number | null
    alt?: string | null
  }
  copy: { raw: any }
  pageLinks: Array<{
    title: string
    url: string
    description?: { raw: any } | null
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

export const rowHeroBannerInput: RowHeroBannerProps = {
  __typename: 'RowHeroBanner',
  id: 'cldx741qp7u0i0bun77oo5prx',
  heroAsset: {
    url: 'https://media.graphassets.com/zTUkCXlFTshLDzcp9Omg',
    width: null,
    height: null,
    mimeType: 'video/mp4',
    size: 1761151,
    alt: 'Pexels tea',
  },
  copy: {
    raw: {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Generic title',
            },
          ],
        },
        {
          type: 'heading-one',
          children: [
            {
              bold: true,
              text: 'Discover',
            },
            {
              text: ' the art collection.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
        },
      ],
    },
  },
  pageLinks: [
    {
      title: 'Shop Art',
      url: '/men/art',
      description: null,
      asset: null,
    },
  ],
}
