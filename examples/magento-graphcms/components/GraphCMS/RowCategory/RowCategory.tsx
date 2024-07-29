import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { GetMagentoRowCategoryDocument } from './GetMagentoRowCategory.gql'
import { RowCategoryFragment } from './RowCategory.gql'
import { Grid } from './variant/Grid'
import { Swipeable } from './variant/Swipeable'

type VariantRenderer = Record<
  NonNullable<RowCategoryFragment['rowCategoryVariant']>,
  React.FC<RowCategoryFragment>
>

type RowCategoryProps = RowCategoryFragment & {
  renderer?: Partial<VariantRenderer>
} & { sku?: string | null | undefined }

const defaultRenderer: Partial<VariantRenderer> = {
  Grid,
  Swipeable,
}

export function RowCategory(props: RowCategoryProps) {
  const { renderer, rowCategoryVariant, category, ...rest } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetMagentoRowCategoryDocument,
    { variables: { uid: category?.uid ?? '' }, skip: !category?.uid },
    { categories: { items: category ? [category] : [] } },
  )

  if (!rowCategoryVariant) return null

  const RenderType =
    mergedRenderer?.[rowCategoryVariant] ??
    (() => {
      if (process.env.NODE_ENV !== 'production')
        return <>renderer for {rowCategoryVariant} not found</>
      return null
    })

  return (
    <InContextMaskProvider mask={scoped.mask}>
      <RenderType
        {...rest}
        rowCategoryVariant={rowCategoryVariant}
        category={scoped.data.categories?.items?.[0]}
      />
    </InContextMaskProvider>
  )
}
