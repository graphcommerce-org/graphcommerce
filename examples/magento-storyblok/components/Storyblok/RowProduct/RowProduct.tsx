import { PrivateQueryMaskProvider, usePrivateQuery } from '@graphcommerce/graphql'
import {
  ProductListDocument,
  type ProductListItemsFragment,
  type ProductSpecsFragment,
  type RelatedProductsFragment,
  type UpsellProductsFragment,
} from '@graphcommerce/magento-product'
import type { ProductReviewsProps } from '@graphcommerce/magento-review'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowProduct as RowProductBlok } from '../types'
import { Backstory } from './variant/Backstory/Backstory'
import { Feature } from './variant/Feature/Feature'
import { FeatureBoxed } from './variant/FeatureBoxed/FeatureBoxed'
import type { FeatureBoxedFragment } from './variant/FeatureBoxed/FeatureBoxed.gql'
import { Grid } from './variant/Grid/Grid'
import { Related } from './variant/Related/Related'
import { Reviews } from './variant/Reviews/Reviews'
import { Specs } from './variant/Specs/Specs'
import { Swipeable } from './variant/Swipeable/Swipeable'
import { Upsells } from './variant/Upsells/Upsells'

export type RowProductPageProps = Partial<FeatureBoxedFragment> &
  Partial<RelatedProductsFragment> &
  Partial<UpsellProductsFragment> &
  Partial<Omit<ProductReviewsProps, 'sx'>> &
  Partial<Omit<ProductSpecsFragment, 'items'>> & {
    specsItems?: ProductSpecsFragment['items']
  }

export type RowProductVariantProps = {
  blok: RowProductBlok
} & ProductListItemsFragment &
  RowProductPageProps

type VariantRenderer = Record<string, React.FC<RowProductVariantProps>>

const variantRenderer: VariantRenderer = {
  Backstory,
  Feature,
  FeatureBoxed,
  Grid,
  Related,
  Reviews,
  Specs,
  Swipeable,
  Upsells,
}

export function RowProduct({ blok, ...pageProps }: { blok: RowProductBlok } & RowProductPageProps) {
  const variant = (blok.variant as unknown as string) || 'Grid'
  const items = (blok as unknown as { items?: ProductListItemsFragment['items'] }).items ?? []

  const skus = filterNonNullableKeys(items, ['sku']).map((item) => item.sku)
  const scoped = usePrivateQuery(
    ProductListDocument,
    {
      variables: { onlyItems: true, filters: { sku: { in: skus } } },
      skip: !skus.length,
    },
    { products: { items } },
  )

  const Renderer = variantRenderer[variant]
  if (!Renderer) {
    if (process.env.NODE_ENV !== 'production')
      return <div>RowProduct renderer for &ldquo;{variant}&rdquo; not found</div>
    return null
  }

  return (
    <PrivateQueryMaskProvider mask={scoped.mask}>
      <div {...storyblokEditable(blok as unknown as SbBlokData)}>
        <Renderer blok={blok} {...scoped.data?.products} {...pageProps} />
      </div>
    </PrivateQueryMaskProvider>
  )
}
