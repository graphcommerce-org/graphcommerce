import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { ActionCard } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { swatchSizes } from '../ConfigurableOptionValueImage'
import type { ConfigurableOptionValueColorFragment } from './ConfigurableOptionValueColor.gql'

export type ConfigurableOptionValueColorProps =
  ActionCardItemRenderProps<ConfigurableOptionValueColorFragment>

export function ConfigurableOptionValueColor(props: ConfigurableOptionValueColorProps) {
  const { selected, value, onReset, onClick, swatch_data, store_label, size = 'large' } = props

  if (swatch_data?.__typename !== 'ColorSwatchData')
    throw Error(`ConfigurableOptionValueColor can not render a ${swatch_data?.__typename}`)

  return (
    <ActionCard
      {...props}
      image={
        <Box
          sx={{
            width: swatchSizes[size],
            height: swatchSizes[size],
            backgroundColor: swatch_data.value,
            borderRadius: '50%',
          }}
        />
      }
      selected={selected}
      value={value}
      onClick={
        onClick &&
        ((e) => {
          if (selected) {
            onReset(e)
          } else {
            onClick(e, value)
          }
        })
      }
      title={store_label}
      size={size}
    />
  )
}
