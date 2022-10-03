import { SelectedCustomizableOptions } from '@graphcommerce/magento-cart-items'
import { ConfigurableCartItemFragment } from '../../ConfigurableCartItem/ConfigurableCartItem.gql'
import { OptionsList } from '../../ConfigurableCartItem/OptionsList'

type ConfigurableActionCartItemProps = ConfigurableCartItemFragment

export function ConfigurableCartItemOptions(props: ConfigurableActionCartItemProps) {
  const { configurable_customizable } = props
  return (
    <>
      <OptionsList {...props} />
      <SelectedCustomizableOptions customizable_options={configurable_customizable} />
    </>
  )
}
