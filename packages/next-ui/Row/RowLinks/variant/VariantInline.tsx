import type { RowLinksProps } from '../RowLinks'
import { RowLinks } from '../RowLinks'

export function VariantInline(props: RowLinksProps) {
  const { sx = [], inlineTitle = true, ...rowLinksProps } = props

  return (
    <RowLinks
      inlineTitle={inlineTitle}
      {...rowLinksProps}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
