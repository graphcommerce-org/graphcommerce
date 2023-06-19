import { Button, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, alpha, lighten } from '@mui/material'
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
  ProductFiltersProSortSectionProps & {
    sx?: SxProps<Theme>
  }

const defaultRenderer = {
  FilterRangeTypeInput: ProductFilterRangeSection,
  FilterEqualTypeInput: ProductFilterEqualSection,
}

const { classes } = extendableComponent('ProductFiltersProAllFiltersSidebar', [
  'root',
  'button',
] as const)

export function ProductFiltersProAllFiltersSidebar(props: AllFiltersSidebar) {
  const {
    filterTypes,
    aggregations,
    appliedAggregations: aggregationsCount,
    sort_fields,
    total_count,
    renderer,
    sx = [],
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
    <Box
      sx={[{ display: { xs: 'none', md: 'grid' } }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={classes.root}
    >
      {hasFilters && (
        <Button
          className={classes.button}
          sx={(theme) => ({
            mb: theme.spacings.xs,
            transition: 'ease-in-out 250ms all',
            color: theme.palette.text.primary,
            backgroundColor:
              theme.palette.mode === 'light'
                ? alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
                : lighten(theme.palette.background.default, theme.palette.action.hoverOpacity),
            '&:hover': {
              color: theme.palette.primary.contrastText,
            },
          })}
          variant='pill'
          size='medium'
          color='primary'
          onClick={(e) => {
            // Resets all filters
            e.preventDefault()
            if (hasFilters) {
              form.setValue('filters', { category_uid: params.filters.category_uid })
              form.setValue('currentPage', 1)
              form.setValue('sort', null)
              form.setValue('dir', null)
              return submit()
            }
            return null
          }}
        >
          <Trans id='Clear all filters' />
        </Button>
      )}
      <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
      <ProductFiltersProLimitSection />
      <ProductFiltersProAggregations
        filterTypes={filterTypes}
        aggregations={aggregations}
        appliedAggregations={aggregationsCount}
        renderer={{ ...defaultRenderer, ...renderer }}
      />
    </Box>
  )
}
