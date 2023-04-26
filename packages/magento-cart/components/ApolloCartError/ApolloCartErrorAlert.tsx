import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCustomerErrorAlert,
  ApolloCustomerErrorAlertProps,
  CustomerDocument,
} from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useClearCurrentCartId } from '../../hooks'

export type ApolloCartErrorAlertProps = ApolloCustomerErrorAlertProps

export function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error, graphqlErrorAlertProps } = props

  const email = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' }).data?.customer?.email

  const [newError, unauthorized] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    mask: email
      ? i18n._(
          /* i18n */ 'This cart is assigned to {email}. Please sign in to continue shopping.',
          { email },
        )
      : undefined,
    extract: false,
  })

  const clear = useClearCurrentCartId()

  return (
    <ApolloCustomerErrorAlert
      {...props}
      error={newError}
      graphqlErrorAlertProps={{
        action: unauthorized ? (
          <>
            {graphqlErrorAlertProps?.action}
            <Button onClick={clear} color='error' size='small'>
              <Trans id='Sign out' />
            </Button>
            <Button href='/account/login' color='error' size='small'>
              <Trans id='Sign in' />
            </Button>
          </>
        ) : (
          graphqlErrorAlertProps?.action
        ),
      }}
    />
  )
}
