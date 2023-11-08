import {
  ApolloErrorAlert,
  ApolloErrorAlertProps,
  assertFormGqlOperation,
  useFormContext,
} from '@graphcommerce/ecommerce-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorAlertProps = Omit<ApolloErrorAlertProps, 'error'> &
  Partial<Pick<ApolloErrorAlertProps, 'error'>>

export function ApolloCustomerErrorAlert(props: ApolloCustomerErrorAlertProps) {
  const { graphqlErrorAlertProps, error } = props
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const [newError, unauthorized] = useAuthorizationErrorMasked(error ?? methods.error)
  const { query } = useCustomerSession()

  return (
    <ApolloErrorAlert
      {...props}
      error={newError}
      graphqlErrorAlertProps={{
        action: unauthorized ? (
          <>
            {graphqlErrorAlertProps?.action}
            <Button href='/account/signin' color='error' size='small'>
              {query.data?.customerToken ? <Trans id='Sign in' /> : <Trans id='Create Account' />}
            </Button>
          </>
        ) : (
          graphqlErrorAlertProps?.action
        ),
      }}
    />
  )
}
