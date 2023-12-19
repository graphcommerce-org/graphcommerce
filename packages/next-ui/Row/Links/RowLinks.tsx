import { RowLinksProps } from './type'
import { LogoSwiper, ImageLabelSwiper, Inline, Usps } from './variant'

type VariantRenderer = Record<NonNullable<RowLinksProps['linksVariant']>, React.FC<RowLinksProps>>

const defaultRenderer: Partial<VariantRenderer> = {
  LogoSwiper,
  ImageLabelSwiper,
  Inline,
  Usps,
}

export function RowLinks(
  props: RowLinksProps & {
    renderer?: Partial<VariantRenderer>
  },
) {
  const { renderer, linksVariant, ...rest } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!linksVariant) return null

  const RenderType =
    mergedRenderer?.[linksVariant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {linksVariant} not found</>
      return null
    })

  return <RenderType {...rest} />
}
