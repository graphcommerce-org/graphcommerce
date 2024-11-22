import { Money } from '@graphcommerce/magento-store'
import { ChipMenu, extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'
import type { UseRangeProps } from 'react-instantsearch-hooks-web'
import { useRange } from 'react-instantsearch-hooks-web'

export interface RefinementRangeChipProps extends UseRangeProps {
  attribute: string
  title: string
}

const { classes } = extendableComponent('RefinementRangeChip', [
  'root',
  'container',
  'slider',
] as const)

export function RefinementRangeChip(props: RefinementRangeChipProps) {
  const { attribute, title } = props
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { range, refine } = useRange({
    attribute,
    precision: 2,
  })

  const numberMin = Number(range.min)
  const numberMax = Number(range.max)

  const [value, setValue] = useState([numberMin, numberMax])

  useEffect(() => {
    setValue([numberMin, numberMax])
  }, [numberMax, numberMin])

  return (
    <ChipMenu
      variant='outlined'
      label={title}
      className={classes.root}
      selected={numberMin !== value[0]}
      labelRight={
        <>
          <Money round value={value[0] === 0 ? 0.1 : value[0]} />
          {' - '}
          <Money round value={value[1]} />
        </>
      }
      onDelete={() => {
        refine([undefined, undefined])
        setValue([numberMin, numberMax])
      }}
    >
      <Box
        sx={(theme) => ({
          padding: `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
          width: '100%',
        })}
        className={classes.container}
      >
        <Slider
          min={range.min}
          max={range.max}
          size='large'
          aria-labelledby='range-slider'
          value={value}
          onChange={(_, newValue) => {
            setValue([newValue[0], newValue[1]])
          }}
          onChangeCommitted={(_, newValue) => {
            refine([Number(newValue[0]), Number(newValue[1])])
          }}
          valueLabelDisplay='off'
          className={classes.slider}
        />
      </Box>
    </ChipMenu>
  )
}
