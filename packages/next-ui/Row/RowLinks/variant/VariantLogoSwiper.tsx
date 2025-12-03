import { sxx } from '@graphcommerce/next-ui'
import type { RowLinksProps } from '../RowLinks'
import { RowLinks } from '../RowLinks'

export function VariantLogoSwiper(props: RowLinksProps) {
  const { sx = [], ...rowLinksProps } = props

  return (
    <RowLinks
      {...rowLinksProps}
      sx={sxx(
        (theme) => ({
          '& .RowLinks-title': {
            display: 'none',
          },
          '& .Scroller-root': {
            margin: '0 auto',
            width: 'auto',
            maxWidth: 'fit-content',
            gap: theme.spacings.xxl,
          },
        }),
        sx,
      )}
    />
  )
}
