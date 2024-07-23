import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { GetRowProductCategoryDocument } from './GetRowProductCategory.gql'
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
  React.FC<RowProductFragment>
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
  const { renderer, variant, category, ...rest } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetRowProductCategoryDocument,
    { variables: { category_uid: category?.uid ?? '' }, skip: !category?.uid },
    { categories: { items: category ? [category] : [] } },
  )

  if (!variant) return null

  const RenderType =
    mergedRenderer?.[variant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production') return <>renderer for {variant} not found</>
      return null
    })

  return (
    <InContextMaskProvider mask={scoped.mask}>
      <RenderType {...rest} category={scoped.data.categories?.items?.[0]} />
    </InContextMaskProvider>
  )
}
