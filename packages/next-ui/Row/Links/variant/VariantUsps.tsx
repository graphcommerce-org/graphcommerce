import { Links, LinksProps } from '../Links'

export function VariantUsps(props: LinksProps) {
  const { sx = [], inlineTitle = true, ...rowLinksProps } = props

  return (
    <Links
      inlineTitle={inlineTitle}
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
            gap: theme.spacings.lg,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
