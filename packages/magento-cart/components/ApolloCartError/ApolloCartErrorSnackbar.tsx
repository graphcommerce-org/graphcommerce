import {
  ApolloCustomerErrorSnackbar,
  ApolloCustomerErrorSnackbarProps,
} from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorSnackbarProps = ApolloCustomerErrorSnackbarProps

export function ApolloCartErrorSnackbar(props: ApolloCartErrorSnackbarProps) {
  return <ApolloCustomerErrorSnackbar {...props} />
}
