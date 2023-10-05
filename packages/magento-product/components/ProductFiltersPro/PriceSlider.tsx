import { FilterRangeTypeInput } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, filterNonNullableKeys } from '@graphcommerce/next-ui'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Box, Slider, SxProps, Theme, useEventCallback } from '@mui/material'
import { useCallback } from 'react'
import { FilterProps } from './ProductFiltersProAggregations'

export type PriceSliderProps = {
  value: FilterRangeTypeInput | null | undefined
  onChange: (...event: any[]) => void
  sx?: SxProps<Theme>
  options: FilterProps['aggregation']['options']
}

const { classes } = extendableComponent('PriceSlider', ['container', 'slider'] as const)

export function getMinMaxFromOptions(options: PriceSliderProps['options']) {
  const totalRange: [number, number][] = filterNonNullableKeys(options, ['label']).map(
    (v) => v.value.split('_').map((mv) => Number(mv)) as [number, number],
  )
  const min = totalRange[0][0]
  const max = totalRange[totalRange.length - 1][1]

  return [Math.floor(min), Math.ceil(max)] as [number, number]
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
        (theme) => ({
          pt: theme.spacings.md,
          pb: theme.spacings.xs,
          px: theme.spacings.xxs,
        }),
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
