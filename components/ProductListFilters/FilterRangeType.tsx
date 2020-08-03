import { Slider, makeStyles, Theme, Mark, Button } from '@material-ui/core'
import cloneDeep from 'clone-deep'
import { useCategoryPushRoute } from 'components/CategoryLink'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import { GQLProductListFiltersFragment, GQLFilterRangeTypeInput } from 'generated/graphql'
import React from 'react'
import ChipMenu, { ChipMenuProps } from '../ChipMenu'

type FilterRangeTypeProps = NonNullable<
  NonNullable<GQLProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

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

export default function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, ...filterMenuProps } = props
  const classes = useFilterRangeType(props)
  const { params } = useProductListParamsContext()
  const pushRoute = useCategoryPushRoute()

  // eslint-disable-next-line no-case-declarations
  const marks: { [index: number]: Mark } = {}
  const [min, maxish] = options
    ?.map((option) => {
      let val = option?.value.replace('*_', '0_') ?? ''
      val = val.replace('_*', '_0')
      const [minVal, maxVal] = val.split('_').map((value) => Number(value))

      marks[minVal] = { value: minVal, label: minVal }
      marks[maxVal] = { value: maxVal, label: maxVal }
      return [minVal, maxVal]
    })
    .reduce(([prevMin, prevMax], [curMin, curMax]) => {
      return [Math.min(prevMin, curMin), Math.max(curMax, prevMax)]
    }) ?? [0, 0]

  // eslint-disable-next-line no-case-declarations
  const max = (maxish / (options?.length ?? 2 - 1)) * (options?.length ?? 1)
  marks[max] = { value: max, label: max }

  const [value, setValue] = React.useState<[number, number]>([min, max])
  const handleChange = (_, newValue: [number, number]) => setValue(newValue)

  const applyFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.currentPage
    linkParams.filters[attribute_code] = {
      from: String(value[0]),
      to: String(value[1]),
    } as GQLFilterRangeTypeInput

    pushRoute(linkParams)
  }
  const resetFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.currentPage
    delete linkParams.filters[attribute_code]

    setValue([min, max])
    pushRoute(linkParams)
  }

  const currentFilter = params.filters[attribute_code] as GQLFilterRangeTypeInput | undefined

  let currentLabel: string | undefined
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
