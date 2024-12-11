import type { ApolloCustomerErrorAlertProps } from '@graphcommerce/magento-customer'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer'

export type ApolloCartErrorAlertProps = ApolloCustomerErrorAlertProps

export function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  return <ApolloCustomerErrorAlert {...props} />
}
