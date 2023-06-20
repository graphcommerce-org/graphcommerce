import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { useProductFiltersPro } from './ProductFiltersPro'
import { ProductFiltersProAggregationsProps } from './ProductFiltersProAggregations'
import { activeAggregations } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'
import { useClearAllFiltersAction } from './useClearAllFiltersHandler'

type AllFiltersSidebar = ProductFiltersProAggregationsProps & {
  sx?: SxProps<Theme>
}

export function ProductFiltersProClearAll(props: AllFiltersSidebar) {
  const { aggregations, appliedAggregations, sx = [] } = props

  const { params } = useProductFiltersPro()
  const { sort } = params

  const clearAll = useClearAllFiltersAction()

  const activeFilters = activeAggregations(
    applyAggregationCount(aggregations, appliedAggregations, params),
    params,
  ).map(({ label }) => label)

  const allFilters = [...activeFilters, sort].filter(Boolean)
  const hasFilters = allFilters.length > 0

  if (!hasFilters) return null

  return (
    <Button
      sx={sx}
      fullWidth
      variant='pill'
      size='medium'
      color='inherit'
      disableElevation
      onClick={(e) => {
        e.preventDefault()
        return clearAll()
      }}
    >
      <Trans id='Clear all filters' />
    </Button>
  )
}
