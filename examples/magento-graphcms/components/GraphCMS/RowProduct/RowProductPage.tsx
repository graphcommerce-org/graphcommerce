import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { productListRenderer } from '../../ProductListItems'
import { GcPageProduct_RowProductFragment } from './graphql/GcPageProduct_RowProduct.gql'
import { Backstory, Feature, FeatureBoxed, Related, Reviews, Specs, Upsells } from './variant'

type RowProductPageType = Extract<
  NonNullable<NonNullable<GcPageProduct_RowProductFragment['rows']>>[number],
  { __typename: 'RowProduct' }
>

type VariantRenderer = Record<
  NonNullable<RowProductPageType['variant']>,
  React.FC<RowProductPageType & { productListItemRenderer: ProductListItemRenderer }>
>

export type RowProductPageProps = RowProductPageType & {
  renderer?: Partial<VariantRenderer>
}

const defaultRenderer: Partial<VariantRenderer> = {
  Backstory,
  Feature,
  FeatureBoxed,
  Specs,
  Related,
  Reviews,
  Upsells,
}

export function RowProductPage(props: RowProductPageProps) {
  const { renderer, variant, product } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  if (!variant) return null

  const RenderType = mergedRenderer?.[variant]
  if (!variant) return null

  return <RenderType {...props} productListItemRenderer={productListRenderer} product={product} />
}
