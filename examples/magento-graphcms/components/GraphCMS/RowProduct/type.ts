/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowProductProps = {
  __typename:
    | 'RowProduct'
    | 'SimpleProduct'
    | 'ConfigurableProduct'
    | 'GroupedProduct'
    | 'BundleProduct'
    | 'VirtualProduct'
    | 'DownloadableProduct'
    | 'CustomizableProduct'
  id?: string
  variant?:
    | 'Backstory'
    | 'Feature'
    | 'FeatureBoxed'
    | 'Grid'
    | 'Related'
    | 'Reviews'
    | 'Specs'
    | 'Upsells'
    | 'Swipeable'
    | null
  identity: string
  title: string
  asset?: {
    url: string
    width?: number | null
    height?: number | null
    mimeType?: string | null
    size?: number | null
    alt?: string | null
  } | null
  copy?: { raw: any } | null
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

export const rowProductInput: RowProductProps = {
  __typename: 'RowProduct',
  id: 'ckusass740z1u0b55vs724c6z',
  variant: 'Feature',
  identity: 'generic-row-product',
  asset: null,
  title: 'The perfect gift',
  productCopy: {
    raw: {
      children: [
        {
          type: 'heading-two',
          children: [
            {
              text: 'Generic Row Product',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus turpis ex, ut placerat enim vestibulum quis. Aliquam finibus accumsan eros, vitae commodo tellus molestie a. Aliquam fringilla in lectus in blandit. Quisque placerat pellentesque orci, et tincidunt nisl fringilla non. ',
            },
          ],
        },
      ],
    },
  },
  pageLinks: [],
}
