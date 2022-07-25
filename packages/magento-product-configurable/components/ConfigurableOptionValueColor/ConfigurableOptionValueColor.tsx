import { ActionCard, ActionCardItemRenderProps } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { ConfigurableOptionValueColorFragment } from './ConfigurableOptionValueColor.gql'

export type ConfigurableOptionValueColorProps =
  ActionCardItemRenderProps<ConfigurableOptionValueColorFragment>

export function ConfigurableOptionValueColor(props: ConfigurableOptionValueColorProps) {
  const { swatch_data, store_label } = props
  const color = swatch_data?.__typename === 'ColorSwatchData' && (
    <Box
      sx={{
        width: '40px',
        height: '40px',
        backgroundColor: swatch_data.value,
        borderRadius: '50%',
      }}
    />
  )

  return <ActionCard {...props} image={color} title={store_label} />
}
