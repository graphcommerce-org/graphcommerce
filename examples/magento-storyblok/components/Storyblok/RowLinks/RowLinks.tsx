import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type {
  StoryblokRowLinks as RowLinksBlok,
  StoryblokPageLink,
} from '../../../.storyblok/types/291439709879423/storyblok-components'
import type { StoryblokRichtext } from '../../../.storyblok/types/storyblok.d.ts'
import { ImageLabelSwiper } from './variant/ImageLabelSwiper'
import { Inline } from './variant/Inline'
import { LogoSwiper } from './variant/LogoSwiper'
import { Usps } from './variant/Usps'

export type RowLinksVariantProps = {
  title?: string
  copy?: StoryblokRichtext
  page_links?: StoryblokPageLink[]
}

type VariantRenderer = Record<string, React.FC<RowLinksVariantProps>>

const variantRenderer: VariantRenderer = {
  Inline,
  Usps,
  LogoSwiper,
  ImageLabelSwiper,
}

export function RowLinks({ blok }: { blok: RowLinksBlok }) {
  const variant = blok.variant as unknown as string | undefined
  if (!variant) return null

  const Renderer = variantRenderer[variant]
  if (!Renderer) {
    if (process.env.NODE_ENV !== 'production')
      return <div>RowLinks renderer for &ldquo;{variant}&rdquo; not found</div>
    return null
  }

  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      <Renderer title={blok.title} copy={blok.copy} page_links={blok.page_links} />
    </div>
  )
}
