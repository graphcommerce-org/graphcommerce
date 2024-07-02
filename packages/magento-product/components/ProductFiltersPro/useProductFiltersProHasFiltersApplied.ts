import { useMemo } from 'react'
import { useProductFiltersPro } from './ProductFiltersPro'
import { activeAggregations } from './activeAggregations'
import { applyAggregationCount } from './applyAggregationCount'

export function useProductFilterProHasFiltersApplied() {
  const { params, aggregations, appliedAggregations } = useProductFiltersPro()
  const { sort } = params

  const hasFilters = useMemo(() => {
    const activeFilters = activeAggregations(
      applyAggregationCount(aggregations, appliedAggregations, params),
      params,
    ).map(({ label }) => label)

    const allFilters = [...activeFilters, sort].filter(Boolean)
    return allFilters.length > 0
  }, [aggregations, appliedAggregations, params, sort])

  return hasFilters
}
