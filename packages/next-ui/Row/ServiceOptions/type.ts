/* eslint-disable @typescript-eslint/no-explicit-any */
export type RowServiceOptionsProps = {
  __typename: 'RowServiceOptions'
  id?: string
  title: string
  options: Array<{
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

export const rowServiceOptionsInput: RowServiceOptionsProps = {
  __typename: 'RowServiceOptions',
  id: 'ckj1kl0bs5hfx0b52w3tlnxm7',
  title: "Can't find the answer you've been searching for?",
  serviceOptions: [
    {
      title: 'Phone',
      url: 'tel:071 744 0084',
      description: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'We are ready for you. There may be a waiting time of 2 minutes.',
                },
              ],
            },
          ],
        },
      },
      asset: null,
    },
    {
      title: 'E-mail',
      url: 'mailto:info@reachdigital.nl',
      description: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Go oldskool. It may take us a day or two to answer your e-mail.',
                },
              ],
            },
          ],
        },
      },
      asset: null,
    },
  ],
}
