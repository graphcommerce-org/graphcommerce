import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListItemRenderer, ProductListDocument } from '@graphcommerce/magento-product'
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
  React.FC<RowProductFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
  productListItemRenderer: ProductListItemRenderer
} & { sku?: string | null | undefined }

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
  const { renderer, productListItemRenderer, category, ...rest } = props
  let { variant } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const urlKeys = filterNonNullableKeys(category?.products?.items).map((item) => item.url_key)
  const scoped = useInContextQuery(
    ProductListDocument,
    { variables: { onlyItems: true, filters: { url_key: { in: urlKeys } } } },
    { products: { items: category?.products?.items } },
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
