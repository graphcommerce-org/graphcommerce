import {} from '@graphcommerce/graphcms-ui'
import { RowLinksFragment } from './RowLinks.gql'
import { LogoSwiper, ImageLabelSwiper, Inline } from './variant'

type VariantRenderer = Record<
  NonNullable<RowLinksFragment['linksVariant']>,
  React.VFC<RowLinksFragment>
>

type RowLinksProps = RowLinksFragment & {
  renderer?: Partial<VariantRenderer>
}

const defaultRenderer: Partial<VariantRenderer> = {
  LogoSwiper,
  ImageLabelSwiper,
  Inline,
}

export function RowLinks(props: RowLinksProps) {
  const { renderer, linksVariant, ...RowLinksProps } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!linksVariant) return null

  const RenderType =
    mergedRenderer?.[linksVariant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {linksVariant} not found</>
      return null
    })

  return <RenderType {...RowLinksProps} />
}
