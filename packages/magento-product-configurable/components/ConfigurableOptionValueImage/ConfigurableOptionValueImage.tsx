import { Image } from '@graphcommerce/image'
import { ActionCardItemRenderProps, ActionCard, responsiveVal } from '@graphcommerce/next-ui'
import { ConfigurableOptionValueImageFragment } from './ConfigurableOptionValueImage.gql'

export type ConfigurableOptionValueImageProps =
  ActionCardItemRenderProps<ConfigurableOptionValueImageFragment>

export const swatchSizes = {
  small: responsiveVal(30, 40),
  medium: responsiveVal(30, 50),
  large: responsiveVal(50, 80),
}

export function ConfigurableOptionValueImage(props: ConfigurableOptionValueImageProps) {
  const { swatch_data, store_label, uid, use_default_value, size, ...actionCardProps } = props

  if (swatch_data?.__typename !== 'ImageSwatchData')
    throw Error(`ConfigurableOptionValueImage can not render a ${swatch_data?.__typename}`)

  const imageSize = swatchSizes[size ?? 'large']

  const image = swatch_data.thumbnail && (
    <Image
      src={swatch_data.thumbnail ?? ''}
      layout='fill'
      alt={swatch_data.value ?? ''}
      sizes={imageSize}
      sx={{
        display: 'block',
        borderRadius: '50%',
        width: imageSize,
        height: imageSize,
        objectFit: 'cover',
      }}
    />
  )

  return <ActionCard {...actionCardProps} image={image} title={store_label} size={size} />
}
