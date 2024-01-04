/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowSpecialBannerProps = {
  __typename: 'RowSpecialBanner'
  id?: string
  title?: string | null
  asset?: {
    url: string
    width?: number | null
    height?: number | null
    mimeType?: string | null
    size?: number | null
    alt?: string | null
  } | null
  copy: { raw: any }
  links: Array<{
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

export const rowSpecialBannerInput: RowSpecialBannerProps = {
  __typename: 'RowSpecialBanner',
  id: 'ckiek99iw429w0a55hmnggxym',
  asset: {
    url: 'https://media.graphassets.com/22gwC1OySda7sx5adccK',
    width: 1532,
    height: 1678,
    mimeType: 'image/jpeg',
    size: 1247616,
    alt: 'Modern masters',
  },
  copy: {
    raw: {
      children: [
        {
          type: 'heading-two',
          children: [
            {
              bold: true,
              text: 'Generic title',
            },
            {
              text: 'Generic title 2',
            },
            {
              bold: true,
              text: 'Generic title 3',
            },
          ],
        },
      ],
    },
  },
  pageLinks: [
    {
      title: 'A complete collection',
      url: '/men/art',
      description: null,
      asset: null,
    },
  ],
  topic: 'A peek into history',
}
