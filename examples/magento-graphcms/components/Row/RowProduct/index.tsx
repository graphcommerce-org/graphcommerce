import { ProductSpecsFragment } from '@graphcommerce/magento-product/components/ProductSpecs/ProductSpecs.gql'
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
} & ProductSpecsFragment & {
    items?: unknown
  }

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

export default function RowProduct(props: RowProductProps) {
  const { renderer, variant, ...RowProductProps } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!variant) return <></>

  const RenderType = mergedRenderer[variant]

  return <RenderType {...RowProductProps} />
}
