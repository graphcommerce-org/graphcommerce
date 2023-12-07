import { LogoSwiper, ImageLabelSwiper, Inline, Usps } from './variant'

type RowLinksProps = {
  __typename: string
  id: string
  title: string
  linksVariant?: 'Inline' | 'ImageLabelSwiper' | 'LogoSwiper' | 'Usps' | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowLinksCopy?: { raw: any } | null
  pageLinks: Array<{
    id: string
    title: string
    url: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: { raw: any } | null
    asset?: {
      url: string
      width?: number | null
      height?: number | null
      mimeType?: string | null
      size?: number | null
      alt?: string | null
    } | null
  }>
} & {
  renderer?: Partial<VariantRenderer>
}

type VariantRenderer = Record<NonNullable<RowLinksProps['linksVariant']>, React.FC<RowLinksProps>>

const defaultRenderer: Partial<VariantRenderer> = {
  LogoSwiper,
  ImageLabelSwiper,
  Inline,
  Usps,
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
