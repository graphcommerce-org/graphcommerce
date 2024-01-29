import { ProductListItemRenderer } from '@graphcommerce/magento-product'
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
  React.FC<RowProductFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
  productListItemRenderer: ProductListItemRenderer
} & ProductSpecsFragment & { sku?: string | null | undefined }

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

export function RowProduct(props: RowProductProps) {
  const { renderer, productListItemRenderer, ...RowProductProps } = props
  let { variant } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!variant) variant = 'Related'

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return <RenderType {...RowProductProps} productListItemRenderer={productListItemRenderer} />
}
