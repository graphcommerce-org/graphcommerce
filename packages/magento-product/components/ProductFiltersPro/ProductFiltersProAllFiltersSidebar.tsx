import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ProductFiltersProAggregationsProps } from './ProductFiltersProAggregations'
import {
  ProductFiltersProAggregations,
  productFiltersProSectionRenderer,
} from './ProductFiltersProAggregations'
import type { ProductFiltersCategorySectionProps } from './ProductFiltersProCategorySection'
import { ProductFiltersProCategorySection } from './ProductFiltersProCategorySection'
import { ProductFiltersProLimitSection } from './ProductFiltersProLimitSection'
import type { ProductFiltersProSortSectionProps } from './ProductFiltersProSortSection'
import { ProductFiltersProSortSection } from './ProductFiltersProSortSection'

export type ProductFiltersProAllFiltersSidebarProps = ProductFiltersProAggregationsProps &
  ProductFiltersProSortSectionProps &
  ProductFiltersCategorySectionProps & { sx?: SxProps<Theme> }

/**
 * @deprecated Not used anymore
 *
 * @param props
 * @returns
 */
export function ProductFiltersProAllFiltersSidebar(props: ProductFiltersProAllFiltersSidebarProps) {
  const { sort_fields, total_count, renderer, sx = [], category, params } = props

  return (
    <Box sx={[{ display: { xs: 'none', md: 'grid' } }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <ProductFiltersProCategorySection category={category} params={params} />
      <ProductFiltersProSortSection
        sort_fields={sort_fields}
        total_count={total_count}
        category={category}
      />
      <ProductFiltersProLimitSection />
      <ProductFiltersProAggregations
        renderer={{ ...productFiltersProSectionRenderer, ...renderer }}
      />
    </Box>
  )
}
