import { ApolloErrorSnackbarProps, ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import React from 'react'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorSnackbarProps = Omit<ApolloErrorSnackbarProps, 'action'>

export function ApolloCartErrorSnackbar(props: ApolloCartErrorSnackbarProps) {
  const { error, ...passedProps } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  const action = noSuchEntity ? (
    <Button onClick={clear} variant='pill' color='secondary'>
      <Trans id='Reset Cart' />
    </Button>
  ) : undefined

  return <ApolloErrorSnackbar error={error} action={action} {...passedProps} />
}
