import {
  ApolloCustomerErrorAlert,
  ApolloCustomerErrorAlertProps,
} from '@graphcommerce/magento-customer'

export type ApolloCartErrorAlertProps = ApolloCustomerErrorAlertProps & { resetCart?: boolean }

export function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  return <ApolloCustomerErrorAlert {...props} />
}
