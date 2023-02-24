import { useWatch } from '@graphcommerce/ecommerce-ui'
import {
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
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

  const { submit, params } = useProductFiltersPro()
  const { filters } = params

  const activeFilters = filterNonNullableKeys(aggregations)
    .filter(({ attribute_code }) => attribute_code !== 'category_id')
    .filter(
      ({ attribute_code }) =>
        filters[attribute_code]?.from || filters[attribute_code]?.to || filters[attribute_code]?.in,
    )
    .map(({ label }) => label)
  const hasFilters = activeFilters.length > 0

  return (
    <ChipOverlayOrPopper
      label='All filters'
      chipProps={{ variant: 'outlined' }}
      onApply={submit}
      // onReset={
      //   hasFilters
      //     ? () => {
      //         form.reset({ filters: {}, currentPage: 1 })
      //         return submit()
      //       }
      //     : undefined
      // }
      onClose={submit}
      selectedLabel={['All filters', ...activeFilters]}
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
