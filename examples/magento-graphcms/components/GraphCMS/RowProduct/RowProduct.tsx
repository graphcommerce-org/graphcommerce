import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { productListRenderer } from '../../ProductListItems'
import { GetMagentoRowProductDocument } from './GetMagentoRowProduct.gql'
import { RowProductDeprecated } from './RowProductDeprecated'
import { RowProductFragment } from './graphql/RowProduct.gql'
import { Backstory, Feature, FeatureBoxed } from './variant'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.FC<RowProductFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
}

const defaultRenderer: Partial<VariantRenderer> = {
  Backstory,
  Feature,
  FeatureBoxed,
  Related: () => <>Only available on the product page</>,
  Reviews: () => <>Only available on the product page</>,
  Specs: () => <>Only available on the product page</>,
  Upsells: () => <>Only available on the product page</>,
  Grid: RowProductDeprecated,
  Swipeable: RowProductDeprecated,
}

export function RowProduct(props: RowProductProps) {
  const { renderer, variant, product } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetMagentoRowProductDocument,
    { variables: { urlKey: product?.url_key ?? '' }, skip: !product?.url_key },
    { products: { items: [product!] } },
  )

  if (!variant) return null

  const RenderType = mergedRenderer?.[variant]

  return (
    <InContextMaskProvider mask={scoped.mask}>
      {/* <RowProductDeprecated {...props} /> */}
      {RenderType && (
        <RenderType
          {...props}
          productListItemRenderer={productListRenderer}
          product={scoped.data.products?.items?.[0]}
        />
      )}
    </InContextMaskProvider>
  )
}
