import { PrivateQueryMaskProvider, usePrivateQuery } from '@graphcommerce/graphql'
import { ProductListDocument, type ProductListItemsFragment } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowProduct as RowProductBlok } from '../types'
import { Backstory } from './variant/Backstory/Backstory'
import { Grid } from './variant/Grid/Grid'
import { Swipeable } from './variant/Swipeable/Swipeable'

export type RowProductVariantProps = {
  blok: RowProductBlok
} & ProductListItemsFragment

type VariantRenderer = Record<string, React.FC<RowProductVariantProps>>

const variantRenderer: VariantRenderer = { Backstory, Grid, Swipeable }

type RowProductProps = {
  blok: RowProductBlok
  items?: ProductListItemsFragment['items']
}

export function RowProduct({ blok, items: itemsOverride }: RowProductProps) {
  const variant = (blok.variant as unknown as string) || 'Grid'
  const blokItems = (blok as unknown as { items?: ProductListItemsFragment['items'] }).items ?? []
  const items = itemsOverride ?? blokItems

  const skus = itemsOverride ? [] : filterNonNullableKeys(items, ['sku']).map((item) => item.sku)
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
      <div {...storyblokEditable(blok)}>
        <Renderer blok={blok} {...scoped.data?.products} />
      </div>
    </PrivateQueryMaskProvider>
  )
}
