import { FilterRangeTypeInput } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, filterNonNullableKeys } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { SxProps, Theme } from '@mui/material/styles'
import { useEventCallback } from '@mui/material/utils'
import { useCallback } from 'react'
import { FilterProps } from './ProductFiltersProAggregations'

export type PriceSliderProps = {
  value: FilterRangeTypeInput | null | undefined
  onChange: (...event: any[]) => void
  sx?: SxProps<Theme>
  options: FilterProps['options']
}

const { classes } = extendableComponent('PriceSlider', ['container', 'slider'] as const)

export function getMinMaxFromOptions(options: PriceSliderProps['options']) {
  const totalRange: [number, number][] = filterNonNullableKeys(options, ['label']).map(
    (v) => v.value.split('_').map((mv) => Number(mv)) as [number, number],
  )
  const min = totalRange[0][0]
  const max = totalRange[totalRange.length - 1][1]

  return [min, max]
}

export function PriceSlider(props: PriceSliderProps) {
  const { options, value, onChange, sx = [] } = props

  const [min, max] = getMinMaxFromOptions(options)

  const from = value?.from ? Number(value?.from) : min
  const to = value?.to ? Number(value?.to) : max

  const renderMoney = useCallback((v: number) => <Money round value={v} />, [])

  return (
    <Box
      sx={[
        (theme) => ({ pt: theme.spacings.md, pb: theme.spacings.xs }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={classes.container}
    >
      <Slider
        min={min}
        max={max}
        size='large'
        aria-labelledby='range-slider'
        value={[from, to]}
        onChange={useEventCallback((_e, sliderValues) => {
          if (!Array.isArray(sliderValues)) throw Error('not a range')
          const [newFrom, newTo] = sliderValues

          // When the range is the same as the default, set the value to null
          let newVal: Required<FilterRangeTypeInput> | null = null
          if (newFrom !== min || newTo !== max) {
            newVal = { from: String(newFrom), to: String(newTo) }
          }

          // Both values are null, no need to update
          if (!value && !newVal) return

          // All values are the same, no need to update
          if (value && newVal && value.from === newVal.from && value.to === newVal.to) return

          // The value has changed, rerender
          onChange(newVal)
        })}
        valueLabelDisplay='on'
        valueLabelFormat={renderMoney}
        className={classes.slider}
        step={1}
      />
    </Box>
  )
}
