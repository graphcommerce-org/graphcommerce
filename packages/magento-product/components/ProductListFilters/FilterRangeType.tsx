import { cloneDeep } from '@apollo/client/utilities'
import { FilterRangeTypeInput } from '@graphcommerce/graphql'
import { Money } from '@graphcommerce/magento-store'
import { ChipMenu, ChipMenuProps } from '@graphcommerce/next-ui'
import { makeStyles, Mark, Slider, Theme } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

const sliderThumbWidth = 28
const useFilterRangeType = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
      width: '100%',
    },
    slider: {
      maxWidth: `calc(100% - ${sliderThumbWidth}px)`,
      margin: `${theme.spacings.xxs} auto`,
      display: 'block',
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
        width: sliderThumbWidth,
        height: sliderThumbWidth,
        marginLeft: `-${sliderThumbWidth * 0.5}px`,
        marginTop: `-${sliderThumbWidth * 0.5}px`,
        background: theme.palette.background.default,
        boxShadow: theme.shadows[4],
      },
    },
  }),
  { name: 'FilterRangeType' },
)

export default function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, ...chipProps } = props
  const classes = useFilterRangeType(props)
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace({ scroll: false })

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

  useEffect(() => {
    if (!paramValues) setValue([min, max])
  }, [max, min, paramValues])

  const priceFilterUrl = cloneDeep(params)
  delete priceFilterUrl.currentPage
  priceFilterUrl.filters[attribute_code] = {
    from: String(value[0]),
    to: String(value[1]),
  } as FilterRangeTypeInput

  const resetFilter = () => {
    const linkParams = cloneDeep(params)

    delete linkParams.currentPage
    delete linkParams.filters[attribute_code]

    setValue([min, max])
    replaceRoute(linkParams)
  }

  const currentFilter = params.filters[attribute_code] as FilterRangeTypeInput | undefined

  let currentLabel: React.ReactNode | undefined

  if (currentFilter) {
    const from = Number(currentFilter?.from ?? 0)
    const to = Number(currentFilter?.to ?? 0)

    if (from === min && to !== max)
      currentLabel = (
        <>
          {'Below '} <Money round value={Number(currentFilter?.to)} />
        </>
      )

    if (from !== min && to === max)
      currentLabel = (
        <>
          {'Above '} <Money round value={Number(currentFilter?.from)} />
        </>
      )

    if (from !== min && to !== max)
      currentLabel = (
        <>
          <Money round value={Number(currentFilter?.from)} />
          {' — '}
          <Money round value={Number(currentFilter.to)} />
        </>
      )
  }

  return (
    <ChipMenu
      variant='outlined'
      label={label}
      selectedLabel={currentLabel}
      selected={!!currentLabel}
      {...chipProps}
      onDelete={currentLabel ? resetFilter : undefined}
      labelRight={
        <>
          <Money round value={value[0]} />
          {value[0] ? ' — ' : false}
          <Money round value={value[1]} />
        </>
      }
    >
      <div className={classes.container}>
        <Slider
          min={min}
          max={max}
          aria-labelledby='range-slider'
          value={value}
          onChange={(e, newValue) => {
            setValue(Array.isArray(newValue) ? [newValue[0], newValue[1]] : [0, 0])
          }}
          onChangeCommitted={(e, newValue) => {
            if (newValue[0] > min || newValue[1] < max) {
              replaceRoute({ ...priceFilterUrl })
            } else {
              resetFilter()
            }
          }}
          valueLabelDisplay='off'
          className={classes.slider}
        />
      </div>
    </ChipMenu>
  )
}
