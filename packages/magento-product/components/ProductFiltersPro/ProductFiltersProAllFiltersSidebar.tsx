import { ChipOverlayOrPopperProps } from '@graphcommerce/next-ui'
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

type AllFiltersSidebar = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

export function ProductFiltersProAllFiltersSidebar(props: AllFiltersSidebar) {
  const {
    filterTypes,
    aggregations,
    appliedAggregations: aggregationsCount,
    sort_fields,
    total_count,
    renderer,
    ...rest
  } = props

  return (
    <Box
      sx={(theme) => ({
        display: 'grid',

        [theme.breakpoints.down('md')]: { display: 'none' },
      })}
    >
      <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
      <ProductFiltersProLimitSection />
      <ProductFiltersProAggregations
        filterTypes={filterTypes}
        aggregations={aggregations}
        appliedAggregations={aggregationsCount}
        renderer={{
          FilterRangeTypeInput: ProductFilterRangeSection,
          FilterEqualTypeInput: ProductFilterEqualSection,
        }}
      />
    </Box>
  )
}
