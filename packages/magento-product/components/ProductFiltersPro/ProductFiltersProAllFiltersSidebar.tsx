import { CategoryQueryFragment } from '@graphcommerce/magento-category'
import { Box, SxProps, Theme } from '@mui/material'
import { ProductListParams } from '../ProductListItems/filterTypes'
import { ProductFilterEqualSection } from './ProductFilterEqualSection'
import { ProductFilterRangeSection } from './ProductFilterRangeSection'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from './ProductFiltersProAggregations'
import { ProductFiltersProCategorySection } from './ProductFiltersProCategorySection'
import { ProductFiltersProLimitSection } from './ProductFiltersProLimitSection'
import {
  ProductFiltersProSortSection,
  ProductFiltersProSortSectionProps,
} from './ProductFiltersProSortSection'

export type ProductFiltersProAllFiltersSidebarProps = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  CategoryQueryFragment & { sx?: SxProps<Theme>; params?: ProductListParams }

const defaultRenderer = {
  FilterRangeTypeInput: ProductFilterRangeSection,
  FilterEqualTypeInput: ProductFilterEqualSection,
}

export function ProductFiltersProAllFiltersSidebar(props: ProductFiltersProAllFiltersSidebarProps) {
  const { sort_fields, total_count, renderer, sx = [], categories, params } = props

  return (
    <Box sx={[{ display: { xs: 'none', md: 'grid' } }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <ProductFiltersProCategorySection categories={categories} params={params} />
      <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
      <ProductFiltersProLimitSection />
      <ProductFiltersProAggregations renderer={{ ...defaultRenderer, ...renderer }} />
    </Box>
  )
}
