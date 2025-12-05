import { sxx } from '@graphcommerce/next-ui'
import type { RowLinksProps } from '../RowLinks'
import { RowLinks } from '../RowLinks'

export function VariantInline(props: RowLinksProps) {
  const { sx = [], inlineTitle = true, ...rowLinksProps } = props

  return (
    <RowLinks
      inlineTitle={inlineTitle}
      {...rowLinksProps}
      sx={sxx((theme) => ({ '& .RowLinks-scrollerWrapper': { my: theme.spacings.md } }), sx)}
    />
  )
}
