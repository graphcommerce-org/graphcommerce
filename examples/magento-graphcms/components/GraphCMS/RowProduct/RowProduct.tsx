import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListDocument, ProductListItemsFragment } from '@graphcommerce/magento-product'
import { ProductSpecsFragment } from '@graphcommerce/magento-product/components/ProductSpecs/ProductSpecs.gql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
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
  React.FC<
    RowProductFragment &
      ProductListItemsFragment & { productListItemRenderer: ProductListItemRenderer }
  >
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
  productListItemRenderer: ProductListItemRenderer
} & ProductSpecsFragment & { sku?: string | null | undefined } & ProductListItemsFragment

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
  const { renderer, productListItemRenderer, items, ...rest } = props
  let { variant } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const urlKeys = filterNonNullableKeys(items).map((item) => item.url_key)
  const scoped = useInContextQuery(
    ProductListDocument,
    { variables: { onlyItems: true, filters: { url_key: { in: urlKeys } } } },
    { products: { items } },
  )
  const { products } = scoped.data

  const urlKeys = filterNonNullableKeys(items).map((item) => item.url_key)
  const scoped = useInContextQuery(
    ProductListDocument,
    { variables: { onlyItems: true, filters: { url_key: { in: urlKeys } } } },
    { products: { items } },
  )
  const { products } = scoped.data

  if (!variant) variant = 'Related'

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return (
    <InContextMaskProvider mask={scoped.mask}>
      <RenderType {...rest} {...products} productListItemRenderer={productListItemRenderer} />
    </InContextMaskProvider>
  )
}
