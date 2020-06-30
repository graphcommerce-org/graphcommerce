import React from 'react'
import { Slider, makeStyles, Theme, Mark, Button } from '@material-ui/core'
import { ProductListParams } from 'components/ProductList'
import { createRoute } from 'components/CategoryLink'
import Router from 'next/router'
import ChipMenu, { ChipMenuProps } from '../ChipMenu'

type FilterRangeTypeProps = GQLProductListFiltersFragment['aggregations'][0] &
  Omit<ChipMenuProps, 'selected'> & {
    params: ProductListParams
  }

const useFilterRangeType = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: theme.spacings.sm,
      paddingBottom: theme.spacings.xs,
      paddingTop: 0,
    },
  }),
  { name: 'FilterRangeType' },
)

export function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, params, ...filterMenuProps } = props
  const classes = useFilterRangeType(props)

  // eslint-disable-next-line no-case-declarations
  const marks: { [index: number]: Mark } = {}
  const [min, maxish] = options
    .map((option) => {
      let val = option.value.replace('*_', '0_')
      val = val.replace('_*', '_0')
      const [minVal, maxVal] = val.split('_').map((value) => Number(value))

      marks[minVal] = { value: minVal, label: minVal }
      marks[maxVal] = { value: maxVal, label: maxVal }
      return [minVal, maxVal]
    })
    .reduce(([prevMin, prevMax], [curMin, curMax]) => {
      return [Math.min(prevMin, curMin), Math.max(curMax, prevMax)]
    })

  // eslint-disable-next-line no-case-declarations
  const max = (maxish / (options.length - 1)) * options.length
  marks[max] = { value: max, label: max }

  const [value, setValue] = React.useState<[number, number]>([min, max])
  const handleChange = (event, newValue: [number, number]) => setValue(newValue)

  const applyFilter = () => {
    const linkParams = { ...params, filters: { ...params.filters } }
    delete linkParams.currentPage
    linkParams.filters[attribute_code] = {
      from: String(value[0]),
      to: String(value[1]),
    } as GQLFilterRangeTypeInput
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(linkParams))
  }
  const resetFilter = () => {
    const linkParams = { ...params, filters: { ...params.filters } }
    delete linkParams.currentPage
    delete linkParams.filters[attribute_code]

    setValue([min, max])
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(linkParams))
  }

  const currentFilter = params.filters[attribute_code] as GQLFilterRangeTypeInput | undefined

  let currentLabel
  if (currentFilter?.from === '*' && currentFilter?.to !== '*')
    currentLabel = `0 - ${currentFilter.to}`
  if (currentFilter?.from !== '*' && currentFilter?.to === '*')
    currentLabel = `&gt; ${currentFilter?.from}`
  if (currentFilter && currentFilter.from !== '*' && currentFilter.to !== '*')
    currentLabel = `${currentFilter.from} - ${currentFilter.to}`

  return (
    <ChipMenu
      key={attribute_code}
      label={label}
      selectedLabel={currentLabel}
      selected={!!currentLabel}
      {...filterMenuProps}
      onDelete={currentLabel ? resetFilter : undefined}
    >
      <div className={classes.container}>
        <Slider
          min={min}
          max={max}
          marks={Object.values(marks)}
          step={Math.floor(max / 20)}
          aria-labelledby='range-slider'
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
        />
        <Button onClick={resetFilter} size='small'>
          Reset
        </Button>
        <Button
          variant='contained'
          size='small'
          color='primary'
          disableElevation
          onClick={applyFilter}
        >
          Apply
        </Button>
      </div>
    </ChipMenu>
  )
}
