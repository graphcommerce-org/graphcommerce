import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
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
}

const defaultRenderer: Partial<VariantRenderer> = {
  Grid,
  Swipeable,
}

function RowCategoryPreview(props: RowCategoryProps) {
  const { category, categoryUrl, rowCategoryVariant, renderer } = props
  const router = useRouter()
  const canShow = router.isPreview || process.env.NODE_ENV !== 'production'
  if (category || !canShow) return null

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        border: `3px dashed ${theme.palette.error.light}`,
        m: 2,
        borderRadius: 2,
      })}
    >
      Hygraph RowCategory ({rowCategoryVariant}) was configured with Category URL &quot;
      <code>{categoryUrl}</code>&quot;, However Magento didn&apos;t return any results.
    </Box>
  )
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
      <RowCategoryPreview {...props} />
      <RenderType
        {...rest}
        rowCategoryVariant={rowCategoryVariant}
        category={scoped.data.categories?.items?.[0]}
      />
    </InContextMaskProvider>
  )
}
