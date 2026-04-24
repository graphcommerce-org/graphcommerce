import type {
  ProductSpecsFragment,
  RelatedProductsFragment,
  UpsellProductsFragment,
} from '@graphcommerce/magento-product'
import type { ProductReviewsProps } from '@graphcommerce/magento-review'
import { storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowPdp as RowPdpBlok } from '../types'
import { Feature } from './variant/Feature/Feature'
import { FeatureBoxed } from './variant/FeatureBoxed/FeatureBoxed'
import type { FeatureBoxedFragment } from './variant/FeatureBoxed/FeatureBoxed.gql'
import { Related } from './variant/Related/Related'
import { Reviews } from './variant/Reviews/Reviews'
import { Specs } from './variant/Specs/Specs'
import { Upsells } from './variant/Upsells/Upsells'

export type RowPdpPageProps = Partial<FeatureBoxedFragment> &
  Partial<RelatedProductsFragment> &
  Partial<UpsellProductsFragment> &
  Partial<Omit<ProductReviewsProps, 'sx'>> &
  Partial<Omit<ProductSpecsFragment, 'items'>> & {
    specsItems?: ProductSpecsFragment['items']
  }

export type RowPdpVariantProps = {
  blok: RowPdpBlok
} & RowPdpPageProps

type VariantRenderer = Record<string, React.FC<RowPdpVariantProps>>

const variantRenderer: VariantRenderer = {
  Feature,
  FeatureBoxed,
  Related,
  Reviews,
  Specs,
  Upsells,
}

export function RowPdp({ blok, ...pageProps }: { blok: RowPdpBlok } & RowPdpPageProps) {
  const variant = (blok.variant as unknown as string) || 'Specs'

  const Renderer = variantRenderer[variant]
  if (!Renderer) {
    if (process.env.NODE_ENV !== 'production')
      return <div>RowPdp renderer for &ldquo;{variant}&rdquo; not found</div>
    return null
  }

  return (
    <div {...storyblokEditable(blok)}>
      <Renderer blok={blok} {...pageProps} />
    </div>
  )
}
