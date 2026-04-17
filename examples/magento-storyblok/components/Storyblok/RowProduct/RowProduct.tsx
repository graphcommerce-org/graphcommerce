import { PrivateQueryMaskProvider, usePrivateQuery } from '@graphcommerce/graphql'
import { ProductListDocument, type ProductListItemsFragment } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowProduct as RowProductBlok } from '../types'
import { Backstory } from './variant/Backstory'
import { Feature } from './variant/Feature'
import { Grid } from './variant/Grid'
import { Swipeable } from './variant/Swipeable'

export type RowProductVariantProps = {
  blok: RowProductBlok
} & ProductListItemsFragment

type VariantRenderer = Record<string, React.FC<RowProductVariantProps>>

const variantRenderer: VariantRenderer = {
  Grid,
  Swipeable,
  Feature,
  Backstory,
}

export function RowProduct({ blok }: { blok: RowProductBlok }) {
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
        <Renderer blok={blok} {...scoped.data?.products} />
      </div>
    </PrivateQueryMaskProvider>
  )
}
