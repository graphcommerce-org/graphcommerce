import { RowLinks, RowLinksProps } from '../RowLinks'

export function VariantInline(props: RowLinksProps) {
  const { title, children, sx = [], maxWidth, showButtons } = props

  return (
    <RowLinks
      title={title}
      showButtons={showButtons}
      maxWidth={maxWidth}
      inlineTitle
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </RowLinks>
  )
}
