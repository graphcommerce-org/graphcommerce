import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { CustomerDocument, CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { t } from '@lingui/macro'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorAlertProps = ApolloErrorAlertProps

export function ApolloCartErrorAlert(props: ApolloCartErrorAlertProps) {
  const { error } = props
  const clear = useClearCurrentCartId()
  const token = useQuery(CustomerTokenDocument).data?.customerToken
  const email = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' }).data?.customer?.email

  let action: JSX.Element | undefined

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  action = noSuchEntity ? <Button onClick={clear}>Reset Cart</Button> : undefined

  const authMessage = email
    ? t`Please reauthenticate &lsquo;${email}&rsquo; and try again`
    : t`Please reauthenticate and try again`

  const signInMessage = t`You must sign in to continue`

  const [, authorizationError] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    mask: token?.token ? authMessage : signInMessage,
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
