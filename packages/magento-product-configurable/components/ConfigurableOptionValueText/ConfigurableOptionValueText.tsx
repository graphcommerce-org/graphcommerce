import { ActionCard, ActionCardItemRenderProps, ActionCardProps } from '@graphcommerce/next-ui'
import { ConfigurableOptionValueTextFragment } from './ConfigurableOptionValueText.gql'

export type ConfigurableOptionValueTextProps =
  ActionCardItemRenderProps<ConfigurableOptionValueTextFragment> & Pick<ActionCardProps, 'size'>

export function ConfigurableOptionValueText(props: ConfigurableOptionValueTextProps) {
  const { swatch_data, store_label, uid, use_default_value, size, ...actionCardProps } = props

  if (swatch_data?.__typename !== 'TextSwatchData')
    throw Error(`ConfigurableOptionValueText can not render a ${swatch_data?.__typename}`)

  return (
    <ActionCard
      {...actionCardProps}
      size={size}
      title={swatch_data?.value ?? store_label}
      details={size !== 'small' && swatch_data?.value ? store_label : undefined}
    />
  )
}
