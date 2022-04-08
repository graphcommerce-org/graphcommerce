import { ApolloErrorSnackbar, ApolloErrorSnackbarProps } from '@graphcommerce/ecommerce-ui'

type ApolloCustomerErrorSnackbarProps = ApolloErrorSnackbarProps

export function ApolloCustomerErrorSnackbar(props: ApolloCustomerErrorSnackbarProps) {
  return <ApolloErrorSnackbar {...props} />
}
