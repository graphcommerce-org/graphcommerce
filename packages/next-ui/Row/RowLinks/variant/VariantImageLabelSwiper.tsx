import { RowLinks, RowLinksProps } from '../RowLinks'

export function VariantImageLabelSwiper(props: RowLinksProps) {
  const { title, copy, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      maxWidth={maxWidth}
      showButtons={showButtons}
      title={title}
      copy={copy}
      sx={[
        {
          '& .RowLinks-title': {
            typography: 'h5',
            textTransform: 'uppercase',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </RowLinks>
  )
}
