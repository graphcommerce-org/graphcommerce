import { Image } from '@graphcommerce/image'
import { ActionCardItemRenderProps, ActionCard } from '@graphcommerce/next-ui'
import { ConfigurableOptionValueImageFragment } from './ConfigurableOptionValueImage.gql'

export type ConfigurableOptionValueImageProps =
  ActionCardItemRenderProps<ConfigurableOptionValueImageFragment>

export function ConfigurableOptionValueImage(props: ConfigurableOptionValueImageProps) {
  const { swatch_data, store_label, uid, use_default_value, ...actionCardProps } = props

  if (swatch_data?.__typename !== 'ImageSwatchData')
    throw Error(`ConfigurableOptionValueText can not render a ${swatch_data?.__typename}`)

  const image = swatch_data.thumbnail && (
    <Image
      src={swatch_data.thumbnail ?? ''}
      layout='fill'
      alt={swatch_data.value ?? ''}
      sx={{ display: 'block', borderRadius: '50%' }}
    />
  )

  return <ActionCard {...actionCardProps} image={image} title={store_label} />
}
