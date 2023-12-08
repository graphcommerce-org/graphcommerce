import { Links, LinksProps } from '../Links'

export function VariantInline(props: LinksProps) {
  const { sx = [], inlineTitle = true, ...rowLinksProps } = props

  return (
    <Links
      inlineTitle={inlineTitle}
      {...rowLinksProps}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
