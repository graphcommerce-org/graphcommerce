import { RowLinks, RowLinksProps } from '../RowLinks'

export function VariantLogoSwiper(props: RowLinksProps) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      showButtons={showButtons}
      maxWidth={maxWidth}
      title={title}
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
    >
      {children}
    </RowLinks>
  )
}
