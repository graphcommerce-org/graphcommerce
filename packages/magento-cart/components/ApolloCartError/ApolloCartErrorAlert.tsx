import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorAlertProps = ApolloErrorAlertProps

export function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error } = props
  const clear = useClearCurrentCartId()
  const { token } = useCustomerSession()

  let action: JSX.Element | undefined

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  action = noSuchEntity ? <Button onClick={clear}>Reset Cart</Button> : undefined

  const [, authorizationError] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    mask: token
      ? i18n._(/* i18n */ `Please reauthenticate and try again`)
      : i18n._(/* i18n */ `You must sign in to continue`),
  })

  action =
    authorizationError && clear ? (
      <Link href='/account/signin' passHref>
        <Button>
          <Trans id='Sign in' />
        </Button>
      </Link>
    ) : (
      action
    )

  return <ApolloErrorAlert {...props} graphqlErrorAlertProps={{ action }} />
}
