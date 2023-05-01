import { CartFabProps } from '@graphcommerce/magento-cart'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { CompareFab } from '../components'

export const component = 'CartFab'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'compare'

function MagentoCompareListGraphqlProvider(props: PluginProps<CartFabProps>) {
  const { Prev, ...rest } = props
  return (
    <>
      <Prev {...rest} />
      <CompareFab />
    </>
  )
}

export const Plugin = MagentoCompareListGraphqlProvider
