import { sxx } from '@graphcommerce/next-ui'
import type { RowLinksProps } from '../RowLinks'
import { RowLinks } from '../RowLinks'

export function VariantUsps(props: RowLinksProps) {
  const { sx = [], inlineTitle = true, ...rowLinksProps } = props

  return (
    <RowLinks
      inlineTitle={inlineTitle}
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
            gap: theme.spacings.lg,
          },
        }),
        sx,
      )}
    />
  )
}
