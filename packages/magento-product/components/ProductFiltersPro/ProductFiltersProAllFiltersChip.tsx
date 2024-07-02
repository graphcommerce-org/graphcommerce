import { ChipOverlayOrPopper, ChipOverlayOrPopperProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useProductFiltersPro } from './ProductFiltersPro'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
  productFiltersProSectionRenderer,
} from './ProductFiltersProAggregations'
import { ProductFiltersProLimitSection } from './ProductFiltersProLimitSection'
import {
  ProductFiltersProSortSection,
  ProductFiltersProSortSectionProps,
} from './ProductFiltersProSortSection'
import { activeAggregations } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'
import { useProductFiltersProClearAllAction } from './useProductFiltersProClearAllAction'

export type ProductFiltersProAllFiltersChipProps = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

export function ProductFiltersProAllFiltersChip(props: ProductFiltersProAllFiltersChipProps) {
  const { sort_fields, total_count, renderer, category, ...rest } = props

  const { submit, params, aggregations, appliedAggregations } = useProductFiltersPro()
  const { sort } = params

  const activeFilters = activeAggregations(
    applyAggregationCount(aggregations, appliedAggregations, params),
    params,
  ).map(({ label }) => label)

  const allFilters = [...activeFilters, sort].filter(Boolean)
  const hasFilters = allFilters.length > 0

  const clearAll = useProductFiltersProClearAllAction()

  return (
    <ChipOverlayOrPopper
      label={<Trans id='All filters' />}
      chipProps={{ variant: 'outlined' }}
      onApply={submit}
      onReset={hasFilters ? clearAll : undefined}
      onClose={submit}
      selectedLabel={allFilters}
      selected={hasFilters}
      breakpoint={false}
      overlayProps={{ variantMd: 'right', widthMd: '500px' }}
      {...rest}
    >
      {() => (
        <>
          <ProductFiltersProSortSection
            sort_fields={sort_fields}
            total_count={total_count}
            category={category}
          />
          <ProductFiltersProLimitSection />
          <ProductFiltersProAggregations
            renderer={{ ...productFiltersProSectionRenderer, ...renderer }}
          />
        </>
      )}
    </ChipOverlayOrPopper>
  )
}
