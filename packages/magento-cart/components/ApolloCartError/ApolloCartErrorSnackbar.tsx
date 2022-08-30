import {
  ApolloCustomerErrorSnackbar,
  ApolloCustomerErrorSnackbarProps,
} from '@graphcommerce/magento-customer'

export type ApolloCartErrorSnackbarProps = ApolloCustomerErrorSnackbarProps

export function ApolloCartErrorSnackbar(props: ApolloCartErrorSnackbarProps) {
  return <ApolloCustomerErrorSnackbar {...props} />
}
