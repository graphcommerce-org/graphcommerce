import { RowLinks, RowLinksProps } from '../RowLinks'

export function VariantImageLabelSwiper(props: RowLinksProps) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      maxWidth={maxWidth}
      showButtons={showButtons}
      title={title}
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
