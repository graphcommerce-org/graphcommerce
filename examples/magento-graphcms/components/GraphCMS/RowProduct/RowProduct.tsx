import { ProductSpecsFragment } from '@graphcommerce/magento-product'
import { RowProductFragment } from './RowProduct.gql'
import { Backstory } from './variant/Backstory'
import { Feature } from './variant/Feature'
import { FeatureBoxed } from './variant/FeatureBoxed'
import { Grid } from './variant/Grid'
import { Related } from './variant/Related'
import { Reviews } from './variant/Reviews'
import { Specs } from './variant/Specs'
import { Swipeable } from './variant/Swipeable'
import { Upsells } from './variant/Upsells'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.VFC<RowProductFragment>
>

export type RowProductPropsWithItems = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
} & ProductSpecsFragment & { items?: unknown } & { sku?: string | null | undefined }

const defaultRenderer: Partial<VariantRenderer> = {
  Specs,
  Backstory,
  Feature,
  FeatureBoxed,
  Grid,
  Related,
  Reviews,
  Upsells,
  Swipeable,
}

export function RowProduct(props: RowProductPropsWithItems) {
  const { renderer, variant, ...RowProductProps } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!variant) return null

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return <RenderType {...RowProductProps} />
}
