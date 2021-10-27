import { useQuery } from '@apollo/client'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { ApolloErrorAlert, ApolloErrorAlertProps, Button } from '@graphcommerce/next-ui'
import Link from 'next/link'
import React from 'react'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorAlertProps = ApolloErrorAlertProps

export default function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error } = props
  const clear = useClearCurrentCartId()
  const token = useQuery(CustomerTokenDocument).data?.customerToken

  let action: JSX.Element | undefined

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  action = noSuchEntity ? <Button onClick={clear}>Reset Cart</Button> : undefined

  const [, authorizationError] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    mask: token?.token ? 'Please reauthenticate and try again' : 'You must sign in to continue',
  })

  action =
    authorizationError && clear ? (
      <Link href='/account/signin' passHref>
        <Button>Sign in</Button>
      </Link>
    ) : (
      action
    )

  return <ApolloErrorAlert {...props} graphqlErrorAlertProps={{ action }} />
}
