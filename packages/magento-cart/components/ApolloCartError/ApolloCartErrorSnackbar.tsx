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
  const { error, action } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })

  return (
    <ApolloCustomerErrorSnackbar
      {...props}
      action={
        noSuchEntity ? (
          <Button onClick={clear} variant='pill' color='secondary'>
            <Trans id='Reset Cart' />
          </Button>
        ) : (
          action
        )
      }
    />
  )
}
