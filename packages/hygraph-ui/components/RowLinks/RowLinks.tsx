import { RowLinksProps } from '@graphcommerce/row-renderer'
import { LogoSwiper, ImageLabelSwiper, Inline, Usps } from './variant'

type VariantRenderer = Record<NonNullable<RowLinksProps['variant']>, React.FC<RowLinksProps>>

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
  const { renderer, variant, ...rest } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!variant) return null

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return <RenderType {...rest} />
}
