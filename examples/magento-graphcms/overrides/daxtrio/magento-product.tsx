import { IfConfig } from '@graphcommerce/next-config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig<'compareVariant'> = ['compareVariant', 'CHECKBOX']

export function ProductPageName() {
  const bla = useStorefrontConfig()

  if (bla.locale === 'en') return 'My override'
  return 'iets anders'
}
