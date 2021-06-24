import { Link } from '@material-ui/core'
import { graphqlErrorByCategory } from '@reachdigital/magento-graphql'
import NextLink from 'next/link'
import ApolloErrorAlert, {
  ApolloErrorAlertProps,
} from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import React, { useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { CustomerTokenDocument } from '../CustomerToken.gql'

type MagentoErrorAlertProps = ApolloErrorAlertProps
export default function ApolloCustomerErrorAlert(props: MagentoErrorAlertProps) {
  const { error } = props
  const client = useApolloClient()

  const [newError, unauthorized] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    extract: false,
    mask: 'Your session has expired, please reauthenticate',
  })

  useEffect(() => {
    if (!unauthorized) return

    const { customerToken } =
      client.cache.readQuery({
        query: CustomerTokenDocument,
      }) ?? {}

    if (customerToken) {
      // Write arbitrary old token to document
      client.cache.writeQuery({
        query: CustomerTokenDocument,
        data: {
          customerToken: {
            ...customerToken,
            createdAt: new Date('2000').toUTCString(),
            valid: false,
          },
        },
        broadcast: true,
      })
    }
  }, [unauthorized])

  const action = unauthorized && (
    <NextLink href='/account/authentication' passHref>
      <Link>Sign In</Link>
    </NextLink>
  )

  return <ApolloErrorAlert error={newError} graphqlErrorAlertProps={{ action }} />
}
