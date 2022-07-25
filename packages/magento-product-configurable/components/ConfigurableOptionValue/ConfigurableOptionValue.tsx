import { ActionCardItemRenderProps, RenderType } from '@graphcommerce/next-ui'
import { ConfigurableOptionValueImage } from '../ConfigurableOptionValueImage/ConfigurableOptionValueImage'
import { ConfigurableOptionValueText } from '../ConfigurableOptionValueText/ConfigurableOptionValueText'
import { ConfigurableOptionValueFragment } from './ConfigurableOptionValue.gql'

export type ConfigurabeOptionValueProps = ActionCardItemRenderProps<ConfigurableOptionValueFragment>

export function ConfigurableOptionValue(props: ConfigurabeOptionValueProps) {
  const { swatch_data } = props

  return (
    <RenderType
      {...props}
      __typename={swatch_data?.__typename ?? 'TextSwatchData'}
      variant='outlined'
      description={swatch_data?.value ?? ''}
      renderer={{
        ColorSwatchData: ConfigurableOptionValueImage,
        ImageSwatchData: ConfigurableOptionValueImage,
        TextSwatchData: ConfigurableOptionValueText,
      }}
    />
  )
}
