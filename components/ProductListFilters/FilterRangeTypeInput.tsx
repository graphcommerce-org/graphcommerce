import React from 'react'
import { Slider } from '@material-ui/core'

type FilterRangeTypeInputProps = GQLProductListFiltersFragment['aggregations'][0]

export function FilterRangeTypeInput({
  attribute_code,
  label,
  options,
}: FilterRangeTypeInputProps) {
  // eslint-disable-next-line no-case-declarations
  const [min, maxish] = options
    .map((option) => {
      let val = option.value.replace('*_', '0_')
      val = val.replace('_*', '_0')
      return val.split('_').map((value) => Number(value))
    })
    .reduce(([prevMin, prevMax], [curMin, curMax]) => {
      return [Math.min(prevMin, curMin), Math.max(curMax, prevMax)]
    })

  // eslint-disable-next-line no-case-declarations
  const max = (maxish / (options.length - 1)) * options.length

  const [value, setValue] = React.useState<[number, number]>([min, max])
  const handleChange = (event, newValue: [number, number]) => setValue(newValue)

  return (
    <Slider
      min={min}
      max={max}
      aria-labelledby='range-slider'
      value={value}
      onChange={handleChange}
      valueLabelDisplay='auto'
    />
  )
}
