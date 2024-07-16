import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { ProductFiltersProAggregationsProps } from './ProductFiltersProAggregations'
import { useProductFiltersProClearAllAction } from './useProductFiltersProClearAllAction'
import { useProductFilterProHasFiltersApplied } from './useProductFiltersProHasFiltersApplied'

type AllFiltersSidebar = ProductFiltersProAggregationsProps & {
  sx?: SxProps<Theme>
}

export function ProductFiltersProClearAll(props: AllFiltersSidebar) {
  const { sx = [] } = props

  const clearAll = useProductFiltersProClearAllAction()
  const hasFilters = useProductFilterProHasFiltersApplied()

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
