import type { RowLinksProps } from '../RowLinks'
import { RowLinks } from '../RowLinks'

export function VariantImageLabelSwiper(props: RowLinksProps) {
  const { sx = [], ...rowLinksProps } = props

  return (
    <RowLinks
      {...rowLinksProps}
      sx={[
        {
          // '& .Scroller-root': {
          //   alignItems: 'start',
          // },
          '& .Scroller-scroller': {
            alignItems: 'start',
          },
          '& .RowLinks-title': {
            typography: 'h5',
            textTransform: 'uppercase',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
