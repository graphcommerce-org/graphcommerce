import { RowLinks, RowLinksProps } from '../RowLinks'

export function VariantUsps(props: RowLinksProps) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      title={title}
      showButtons={showButtons}
      maxWidth={maxWidth}
      inlineTitle
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
    >
      {children}
    </RowLinks>
  )
}
