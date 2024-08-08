import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { productListRenderer } from '../../ProductListItems'
import { RowProduct_ProductPageFragment } from './graphql/RowProduct_ProductPage.gql'
import { Backstory, Feature, FeatureBoxed, Related, Reviews, Specs, Upsells } from './variant'

type VariantRenderer = Record<
  NonNullable<RowProduct_ProductPageFragment['variant']>,
  React.FC<RowProduct_ProductPageFragment & { productListItemRenderer: ProductListItemRenderer }>
>

export type RowProductPageProps = RowProduct_ProductPageFragment & {
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
