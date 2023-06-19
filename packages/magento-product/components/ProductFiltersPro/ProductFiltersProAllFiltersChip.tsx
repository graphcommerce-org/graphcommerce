import { ChipOverlayOrPopper, ChipOverlayOrPopperProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { ProductFilterEqualSection } from './ProductFilterEqualSection'
import { ProductFilterRangeSection } from './ProductFilterRangeSection'
import { useProductFiltersPro } from './ProductFiltersPro'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from './ProductFiltersProAggregations'
import { ProductFiltersProLimitSection } from './ProductFiltersProLimitSection'
import {
  ProductFiltersProSortSection,
  ProductFiltersProSortSectionProps,
} from './ProductFiltersProSortSection'
import { activeAggregations } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'

export type ProductFiltersProAllFiltersChipProps = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

const defaultRenderer = {
  FilterRangeTypeInput: ProductFilterRangeSection,
  FilterEqualTypeInput: ProductFilterEqualSection,
}

export function ProductFiltersProAllFiltersChip(props: ProductFiltersProAllFiltersChipProps) {
  const {
    filterTypes,
    aggregations,
    appliedAggregations: aggregationsCount,
    sort_fields,
    total_count,
    renderer,
    ...rest
  } = props

  const { form, submit, params } = useProductFiltersPro()
  const { sort } = params

  const activeFilters = activeAggregations(
    applyAggregationCount(aggregations, aggregationsCount, params),
    params,
  ).map(({ label }) => label)

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
              form.setValue('filters', { category_uid: params.filters.category_uid })
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
          <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
          <ProductFiltersProLimitSection />
          <ProductFiltersProAggregations
            filterTypes={filterTypes}
            aggregations={aggregations}
            appliedAggregations={aggregationsCount}
            renderer={{ ...defaultRenderer, ...renderer }}
          />
        </Box>
      )}
    </ChipOverlayOrPopper>
  )
}
