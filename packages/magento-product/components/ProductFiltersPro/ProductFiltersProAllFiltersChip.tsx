import { useWatch } from '@graphcommerce/ecommerce-ui'
import {
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { ProductFilterEqualSection } from './ProductFilterEqualSection'
import { ProductFilterRangeSection } from './ProductFilterRangeSection'
import { useProductFiltersPro } from './ProductFiltersPro'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from './ProductFiltersProAggregations'
import {
  ProductFiltersProSortSection,
  ProductFiltersProSortSectionProps,
} from './ProductFiltersProSortSection'

type AllFiltersChip = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

export function ProductFiltersProAllFiltersChip(props: AllFiltersChip) {
  const { filterTypes, aggregations, renderer, sort_fields, total_count, ...rest } = props

  const { form, submit, params } = useProductFiltersPro()
  const { filters, sort } = params

  const activeFilters = filterNonNullableKeys(aggregations)
    .filter(({ attribute_code }) => attribute_code !== 'category_id')
    .filter(
      ({ attribute_code }) =>
        filters[attribute_code]?.from || filters[attribute_code]?.to || filters[attribute_code]?.in,
    )
    .map(({ label }) => label)

  const allFilters = [...activeFilters, sort].filter(Boolean)
  const hasFilters = allFilters.length > 0

  return (
    <ChipOverlayOrPopper
      label={<Trans id='All filters' />}
      chipProps={{ variant: 'outlined' }}
      onApply={submit}
      onReset={
        hasFilters
          ? () => {
              form.setValue('filters', { category_uid: filters.category_uid })
              form.setValue('currentPage', 1)
              form.setValue('sort', null)
              form.setValue('dir', null)
              return submit()
            }
          : undefined
      }
      onClose={submit}
      selectedLabel={allFilters}
      selected={hasFilters}
      breakpoint={false}
      overlayProps={{ variantMd: 'right', widthMd: '500px' }}
      {...rest}
    >
      {() => (
        <Box sx={(theme) => ({ display: 'grid', rowGap: theme.spacings.sm })}>
          <ProductFiltersProSortSection sort_fields={sort_fields} />
          <ProductFiltersProAggregations
            filterTypes={filterTypes}
            aggregations={aggregations}
            renderer={{
              FilterRangeTypeInput: ProductFilterRangeSection,
              FilterEqualTypeInput: ProductFilterEqualSection,
            }}
          />
        </Box>
      )}
    </ChipOverlayOrPopper>
  )
}
