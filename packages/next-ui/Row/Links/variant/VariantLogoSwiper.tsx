import { Links, LinksProps } from '../Links'

export function VariantLogoSwiper(props: LinksProps) {
  const { sx = [], ...rowLinksProps } = props

  return (
    <Links
      {...rowLinksProps}
      sx={[
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
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
