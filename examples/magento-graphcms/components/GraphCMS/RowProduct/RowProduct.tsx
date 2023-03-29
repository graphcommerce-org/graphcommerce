import { ProductSpecsFragment } from '@graphcommerce/magento-product/components/ProductSpecs/ProductSpecs.gql'
import { lazyHydrate } from '../../lazyHydrate'
import { RowProductFragment } from './RowProduct.gql'
import {
  Backstory,
  Feature,
  FeatureBoxed,
  Grid,
  Related,
  Reviews,
  Specs,
  Swipeable,
  Upsells,
} from './variant'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.VFC<RowProductFragment>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
} & ProductSpecsFragment & { items?: unknown }

const defaultRenderer: Partial<VariantRenderer> = {
  Specs: lazyHydrate(Specs),
  Backstory: lazyHydrate(Backstory),
  Feature: lazyHydrate(Feature),
  FeatureBoxed: lazyHydrate(FeatureBoxed),
  Grid: lazyHydrate(Grid),
  Related: lazyHydrate(Related),
  Reviews: lazyHydrate(Reviews),
  Upsells: lazyHydrate(Upsells),
  Swipeable: lazyHydrate(Swipeable),
}

export function RowProduct(props: RowProductProps) {
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
