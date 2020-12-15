import { cloneDeep } from '@apollo/client/utilities'
import { Slider, makeStyles, Theme, Mark, Button } from '@material-ui/core'
import CategoryLink, { useCategoryPushRoute } from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import { FilterRangeTypeInput } from '@reachdigital/magento-graphql'
import Money from '@reachdigital/magento-store/Money'
import clsx from 'clsx'
import React from 'react'
import ChipMenu, { ChipMenuProps } from '../../next-ui/ChipMenu'
import { ProductListFiltersFragment } from '../ProductListFilters.gql'

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

const useFilterRangeType = makeStyles(
  (theme: Theme) => ({
    container: {
      paddingTop: 16,
      paddingBottom: 40,
      width: '100%',
      '& > a': {
        padding: '0 !important',
      },
    },
    filterValueLabel: {
      position: 'absolute',
      top: theme.typography.body2.fontSize,
      right: 0,
      ...theme.typography.body2,
    },
    slider: {
      paddingBottom: 32,
      '& .MuiSlider-rail': {
        color: theme.palette.secondary.mutedText,
        height: 4,
        borderRadius: 10,
      },
      '& .MuiSlider-track': {
        color: theme.palette.primary.main,
        height: 4,
      },
      '& .MuiSlider-thumb': {
        width: 28,
        height: 28,
        marginLeft: -14,
        marginTop: -14,
        background: theme.palette.background.default,
        boxShadow: theme.shadows[4],
      },
    },
    button: {
      borderRadius: 40,
      float: 'right',
      marginLeft: 8,
    },
    resetButton: {
      background: '#F4F4F4',
    },
  }),
  { name: 'FilterRangeType' },
)

export default function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, ...chipProps } = props
  const classes = useFilterRangeType(props)
  const { params } = useProductListParamsContext()
  const pushRoute = useCategoryPushRoute()

  // eslint-disable-next-line no-case-declarations
  const marks: { [index: number]: Mark } = {}
  const paramValues = params.filters[attribute_code]

  const [min, maxish] = options
    ?.map((option) => {
      let val = option?.value.replace('*_', '0_') ?? ''
      val = val.replace('_*', '_0')
      const [minVal, maxVal] = val.split('_').map((value) => Number(value))

      marks[minVal] = { value: minVal, label: minVal }
      marks[maxVal] = { value: maxVal, label: maxVal }
      return [minVal, maxVal]
    })
    .reduce(([prevMin, prevMax], [curMin, curMax]) => [
      Math.min(prevMin, curMin),
      Math.max(curMax, prevMax),
    ]) ?? [0, 0]

  // eslint-disable-next-line no-case-declarations
  const max = (maxish / (options?.length ?? 2 - 1)) * (options?.length ?? 1)
  marks[max] = { value: max, label: max }

  const [value, setValue] = React.useState<[number, number]>(
    paramValues ? [Number(paramValues.from), Number(paramValues.to)] : [min, max],
  )

  const generatePriceFilterUrl = () => {
    const linkParams = cloneDeep(params)

    delete linkParams.currentPage

    linkParams.filters[attribute_code] = {
      from: String(value[0]),
      to: String(value[1]),
    } as FilterRangeTypeInput

    return linkParams
  }

  const resetFilter = () => {
    // TODO: duplicated code.. Component? filterButtonsComponent ?
    const linkParams = cloneDeep(params)

    delete linkParams.currentPage
    delete linkParams.filters[attribute_code]

    setValue([min, max])
    pushRoute(linkParams)
  }

  const currentFilter = params.filters[attribute_code] as FilterRangeTypeInput | undefined

  let currentLabel: React.ReactNode | undefined
  if (currentFilter?.from === '*' && currentFilter?.to !== '*')
    currentLabel = (
      <>
        <Money value={0} /> - <Money value={Number(currentFilter.to)} />
      </>
    )
  if (currentFilter?.from !== '*' && currentFilter?.to === '*')
    currentLabel = (
      <>
        &gt; <Money value={Number(currentFilter?.from)} />
      </>
    )
  if (currentFilter && currentFilter.from !== '*' && currentFilter.to !== '*')
    currentLabel = (
      <>
        <Money value={Number(currentFilter?.from)} /> - <Money value={Number(currentFilter.to)} />
      </>
    )

  const priceFilterUrl = generatePriceFilterUrl()

  return (
    <ChipMenu
      variant='outlined'
      label={label}
      selectedLabel={currentLabel}
      selected={!!currentLabel}
      {...chipProps}
      onDelete={currentLabel ? resetFilter : undefined}
    >
      <div className={classes.container}>
        <div className={classes.filterValueLabel}>
          <Money value={value[0]} /> - <Money value={value[1]} />
        </div>

        <Slider
          min={min}
          max={max}
          // marks={Object.values(marks)}
          // step={Math.floor(max / 20)}
          aria-labelledby='range-slider'
          value={value}
          onChange={(e, newValue) => {
            setValue(Array.isArray(newValue) ? [newValue[0], newValue[1]] : [0, 0])
          }}
          valueLabelDisplay='off'
          className={classes.slider}
        />

        <CategoryLink
          filters={priceFilterUrl.filters}
          sort={priceFilterUrl.sort}
          url={priceFilterUrl.url}
        >
          <Button
            variant='contained'
            size='small'
            color='primary'
            disableElevation
            className={classes.button}
          >
            Apply
          </Button>
        </CategoryLink>

        <Button
          onClick={resetFilter}
          size='small'
          className={clsx(classes.button, classes.resetButton)}
        >
          Reset
        </Button>
      </div>
    </ChipMenu>
  )
}
