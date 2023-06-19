import { Trans } from '@lingui/react'
import { Button, SxProps, Theme, alpha, lighten } from '@mui/material'
import { useProductFiltersPro } from './ProductFiltersPro'
import { ProductFiltersProAggregationsProps } from './ProductFiltersProAggregations'
import { activeAggregations } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'

type AllFiltersSidebar = ProductFiltersProAggregationsProps & {
  sx?: SxProps<Theme>
}

export function ProductFiltersProClearAll(props: AllFiltersSidebar) {
  const { aggregations, appliedAggregations, sx = [] } = props

  const { form, submit, params } = useProductFiltersPro()
  const { sort } = params

  const activeFilters = activeAggregations(
    applyAggregationCount(aggregations, appliedAggregations, params),
    params,
  ).map(({ label }) => label)

  const allFilters = [...activeFilters, sort].filter(Boolean)
  const hasFilters = allFilters.length > 0

  return (
    <Button
      sx={[
        (theme) => ({
          opacity: hasFilters ? 1 : 0,
          transition: 'ease-in-out 250ms all',
          color: theme.palette.text.primary,
          backgroundColor:
            theme.palette.mode === 'light'
              ? alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
              : lighten(theme.palette.background.default, theme.palette.action.hoverOpacity),
          '&:hover': {
            color: theme.palette.primary.contrastText,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      fullWidth
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
  )
}
