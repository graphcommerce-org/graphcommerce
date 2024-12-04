import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { RenderType } from '@graphcommerce/next-ui'
import { ConfigurableOptionValueColor } from '../ConfigurableOptionValueColor'
import { ConfigurableOptionValueImage } from '../ConfigurableOptionValueImage/ConfigurableOptionValueImage'
import { ConfigurableOptionValueText } from '../ConfigurableOptionValueText/ConfigurableOptionValueText'
import type { ConfigurableOptionValueFragment } from './ConfigurableOptionValue.gql'

export type ConfigurabeOptionValueProps = ActionCardItemRenderProps<ConfigurableOptionValueFragment>

export function ConfigurableOptionValue(props: ConfigurabeOptionValueProps) {
  const { swatch_data } = props

  return (
    <RenderType
      {...props}
      __typename={swatch_data?.__typename ?? 'TextSwatchData'}
      description={swatch_data?.value ?? ''}
      renderer={{
        ColorSwatchData: ConfigurableOptionValueColor,
        ImageSwatchData: ConfigurableOptionValueImage,
        TextSwatchData: ConfigurableOptionValueText,
      }}
    />
  )
}
