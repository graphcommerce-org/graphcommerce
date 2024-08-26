import { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { Image } from '@graphcommerce/image'
import { ActionCard, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { ConfigurableOptionValueImageFragment } from './ConfigurableOptionValueImage.gql'

export type ConfigurableOptionValueImageProps =
  ActionCardItemRenderProps<ConfigurableOptionValueImageFragment>

export const swatchSizes = {
  small: responsiveVal(30, 40),
  medium: responsiveVal(30, 50),
  large: responsiveVal(50, 80),
}

export function ConfigurableOptionValueImage(props: ConfigurableOptionValueImageProps) {
  const {
    swatch_data,
    store_label,
    uid,
    use_default_value,
    size = 'large',
    selected,
    onClick,
    onReset,
    value,
    ...actionCardProps
  } = props

  if (swatch_data?.__typename !== 'ImageSwatchData')
    throw Error(`ConfigurableOptionValueImage can not render a ${swatch_data?.__typename}`)

  const image = swatch_data.thumbnail && (
    <Image
      src={swatch_data.thumbnail ?? ''}
      layout='fill'
      alt={swatch_data.value ?? ''}
      sizes={swatchSizes[size]}
      sx={{
        display: 'block',
        borderRadius: '50%',
        width: swatchSizes[size],
        height: swatchSizes[size],
        objectFit: 'cover',
      }}
    />
  )

  return (
    <ActionCard
      {...actionCardProps}
      image={image}
      title={store_label}
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
      reset={
        <Button variant='inline' color='secondary' onClick={onReset} disableRipple>
          <Trans id='Change' />
        </Button>
      }
      size={size}
    />
  )
}
