import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert, {
  ApolloErrorAlertProps,
} from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import React from 'react'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorAlertProps = ApolloErrorAlertProps

export default function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory('graphql-no-such-entity', error)
  const action = noSuchEntity && clear ? <Button onClick={clear}>Reset Cart</Button> : undefined

  return (
    <>
      <ApolloErrorAlert {...props} graphqlErrorAlertProps={{ action }} />
    </>
  )
}
