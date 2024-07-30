import { CartFabProps } from '@graphcommerce/magento-cart'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { CompareFab } from '../components'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart',
  ifConfig: 'compare',
}

export function CartFab(props: PluginProps<CartFabProps>) {
  const { Prev, ...rest } = props
  return (
    <>
      <Prev {...rest} />
      <CompareFab />
    </>
  )
}
