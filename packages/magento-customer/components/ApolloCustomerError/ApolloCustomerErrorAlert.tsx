import type { ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { ApolloErrorAlert } from '@graphcommerce/ecommerce-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorAlertProps = ApolloErrorAlertProps

export function ApolloCustomerErrorAlert(props: ApolloCustomerErrorAlertProps) {
  const { error, graphqlErrorAlertProps } = props
  const [newError, unauthorized] = useAuthorizationErrorMasked(error)

  return (
    <ApolloErrorAlert
      {...props}
      error={newError}
      graphqlErrorAlertProps={{
        action: unauthorized ? (
          <>
            {graphqlErrorAlertProps?.action}
            <Button href='/account/signin' color='error' size='small'>
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
