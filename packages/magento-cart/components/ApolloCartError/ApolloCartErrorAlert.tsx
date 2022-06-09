import {
  ApolloCustomerErrorAlert,
  ApolloCustomerErrorAlertProps,
} from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorAlertProps = ApolloCustomerErrorAlertProps

export function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error, graphqlErrorAlertProps } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })

  return (
    <ApolloCustomerErrorAlert
      {...props}
      graphqlErrorAlertProps={{
        action: noSuchEntity ? (
          <Button onClick={clear}>
            <Trans id='Reset Cart' />
          </Button>
        ) : (
          graphqlErrorAlertProps?.action
        ),
      }}
    />
  )
}
