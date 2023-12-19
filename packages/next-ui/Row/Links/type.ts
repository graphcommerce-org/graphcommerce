/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowLinksProps = {
  __typename: 'RowLinks'
  id?: string
  title: string
  linksVariant?: 'Inline' | 'ImageLabelSwiper' | 'LogoSwiper' | 'Usps' | null
  copy?: { raw: any } | null
  links: Array<{
    id: string
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

export const rowLinksInput = {
  __typename: 'RowLinks' as const,
  id: 'clf1648hhza3f0buqqg6grd6o',
  title: 'Customer service',
  rowLinksCopy: null,
  linksVariant: 'Inline' as const,
  pageLinks: [
    {
      id: 'ckv6jk7jszql80b49np6cptgy',
      title: 'Order',
      url: '/service/order',
      description: null,
      asset: null,
    },
    {
      id: 'ckv6kbfhknt3h0c5946xpj83m',
      title: 'Brand/Sizes',
      url: '/service/brands-and-sizes',
      description: null,
      asset: null,
    },
    {
      id: 'ckv6kbslshuri0c504fi41rur',
      title: 'Newsletter',
      url: '/service/newsletter',
      description: null,
      asset: null,
    },
    {
      id: 'ckv6kc2mwidam0d57h3pq54e3',
      title: 'Payment Information',
      url: '/service/payment-information',
      description: null,
      asset: null,
    },
    {
      id: 'ckv6kcacontqg0c598vcjg24w',
      title: 'Returns',
      url: '/service/returns',
      description: null,
      asset: null,
    },
    {
      id: 'ckv6kciu807s40b49i15zw6rz',
      title: 'Shipping',
      url: '/service/shipping',
      description: null,
      asset: null,
    },
  ],
}
