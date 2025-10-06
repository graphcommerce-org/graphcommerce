import type { AccountMenuItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { DownloadableAccountMenuItem } from '../components/DownloadableAccountMenuItem/DownloadableAccountMenuItem'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-customer',
  type: 'component',
}

export function AccountMenuItem(props: PluginProps<AccountMenuItemProps>) {
  const { Prev, href, ...rest } = props

  return (
    <>
      <Prev {...rest} href={href} />
      {href === '/account/orders' && <DownloadableAccountMenuItem />}
    </>
  )
}
