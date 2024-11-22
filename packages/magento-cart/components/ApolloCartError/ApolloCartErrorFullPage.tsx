import type { ApolloCustomerErrorFullPageProps } from '@graphcommerce/magento-customer'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
import { IconSvg, iconShoppingBag } from '@graphcommerce/next-ui'

export type ApolloCartErrorFullPageProps = Omit<ApolloCustomerErrorFullPageProps, 'icon'>

export function ApolloCartErrorFullPage(props: ApolloCartErrorFullPageProps) {
  return (
    <ApolloCustomerErrorFullPage {...props} icon={<IconSvg src={iconShoppingBag} size='xxl' />} />
  )
}
