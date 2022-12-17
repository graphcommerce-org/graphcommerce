import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Footer as FooterBase } from '@graphcommerce/next-ui'

export function Footer() {
  return (
    <FooterBase
      storeSwitcher={<StoreSwitcherButton />}
      copyright={<span>Copyright GraphCommerce</span>}
    />
  )
}
