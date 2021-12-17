import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, ApolloErrorSnackbarProps, ApolloErrorSnackbar } from '@graphcommerce/next-ui'
import React from 'react'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorSnackbarProps = Omit<ApolloErrorSnackbarProps, 'action'>

export function ApolloCartErrorSnackbar(props: ApolloCartErrorSnackbarProps) {
  const { error, ...passedProps } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  const action = noSuchEntity ? (
    <Button onClick={clear} variant='pill' color='secondary'>
      Reset Cart
    </Button>
  ) : undefined

  return <ApolloErrorSnackbar error={error} action={action} {...passedProps} />
}
