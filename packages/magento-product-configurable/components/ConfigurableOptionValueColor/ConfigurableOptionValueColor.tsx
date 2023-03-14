import { ActionCard, ActionCardItemRenderProps } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { swatchSizes } from '../ConfigurableOptionValueImage'
import { ConfigurableOptionValueColorFragment } from './ConfigurableOptionValueColor.gql'

export type ConfigurableOptionValueColorProps =
  ActionCardItemRenderProps<ConfigurableOptionValueColorFragment>

export function ConfigurableOptionValueColor(props: ConfigurableOptionValueColorProps) {
  const { swatch_data, store_label, size = 'large' } = props

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
      title={store_label}
      size={size}
    />
  )
}
