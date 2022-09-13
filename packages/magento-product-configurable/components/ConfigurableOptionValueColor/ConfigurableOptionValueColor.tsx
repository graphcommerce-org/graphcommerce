import { ActionCard, ActionCardItemRenderProps } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { swatchSizes } from '../ConfigurableOptionValueImage'
import { ConfigurableOptionValueColorFragment } from './ConfigurableOptionValueColor.gql'

export type ConfigurableOptionValueColorProps =
  ActionCardItemRenderProps<ConfigurableOptionValueColorFragment>

export function ConfigurableOptionValueColor(props: ConfigurableOptionValueColorProps) {
  const { swatch_data, store_label, size } = props

  if (swatch_data?.__typename !== 'ColorSwatchData')
    throw Error(`ConfigurableOptionValueColor can not render a ${swatch_data?.__typename}`)

  const imageSize = swatchSizes[size ?? 'large']

  return (
    <ActionCard
      {...props}
      image={
        <Box
          sx={{
            width: imageSize,
            height: imageSize,
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
