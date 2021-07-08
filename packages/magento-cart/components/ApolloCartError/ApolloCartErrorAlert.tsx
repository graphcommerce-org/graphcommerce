import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import { ApolloErrorAlert, ApolloErrorAlertProps, Button } from '@reachdigital/next-ui'

import React from 'react'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorAlertProps = ApolloErrorAlertProps

export default function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  const action = noSuchEntity && clear ? <Button onClick={clear}>Reset Cart</Button> : undefined

  return <ApolloErrorAlert {...props} graphqlErrorAlertProps={{ action }} />
}
