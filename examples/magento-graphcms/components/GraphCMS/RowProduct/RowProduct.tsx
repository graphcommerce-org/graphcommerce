import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListItemRenderer, ProductListDocument } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { productListRenderer } from '../../ProductListItems'
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
import { GetRowProductCategoryDocument } from './GetRowProductCategory.gql'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.FC<RowProductFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
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
  const { renderer, category } = props
  let { variant } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetRowProductCategoryDocument,
    { variables: { category_uid: category?.uid ?? '' }, skip: !category?.uid },
    { categories: { items: category ? [category] : [] } },
  )

  if (!variant) variant = 'Related'

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return (
    <InContextMaskProvider mask={scoped.mask}>
      <RenderType
        {...props}
        productListItemRenderer={productListRenderer}
        category={scoped.data.categories?.items?.[0]}
      />
    </InContextMaskProvider>
  )
}
