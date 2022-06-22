import { ActionCard } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import { ConfigurableOptionsActionCardProps, SwatchDataProps } from './types'

type TextSwatchDataProps = ConfigurableOptionsActionCardProps &
  Pick<SwatchDataProps, 'size'> & { sx?: SxProps<Theme> }

export function TextSwatchData(props: TextSwatchDataProps) {
  const { store_label, swatch_data, value, sx = [] } = props

  return (
    <ActionCard
      key={value}
      value={value ?? ''}
      title={swatch_data?.value ?? store_label}
      details={swatch_data?.value ? store_label : undefined}
      hidden={false}
      variant='outlined'
      {...props}
    />
  )
}
