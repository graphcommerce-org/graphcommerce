import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { useAssignCurrentCartId } from '@graphcommerce/magento-cart'
import { CustomerTokenDocument, useCustomerSession } from '@graphcommerce/magento-customer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { startOciSessionDocument } from '../graphql/StartOciSession.gql'

const paramToString = (param: string | string[] | undefined, options?: { decode?: boolean }) => {
  const { decode } = options || {}
  if (typeof param === 'string') {
    if (decode) return decodeURIComponent(param)
    return param
  }
  return ''
}

export function useOciCart() {
  const router = useRouter()
  const { username, password, HOOK_URL: hookUrl, returntarget: hookTarget } = router.query
  const assignCurrentCartId = useAssignCurrentCartId()
  const client = useApolloClient()
  const { query } = useCustomerSession()

  const reroute = (url: string) => {
    query
      .refetch()
      .then(() => router.replace(url, undefined, { shallow: true }))
      .catch(console.error)
  }

  const [startOciSessionMutation, { data: sessionData, loading, error }] = useMutation(
    startOciSessionDocument,
    {
      variables: {
        username: paramToString(username),
        password: paramToString(password),
        hookUrl: paramToString(hookUrl, { decode: true }),
        hookTarget: typeof hookTarget === 'string' ? hookTarget : undefined,
      },
      onCompleted: (data) => {
        const cartId = data?.startOciSession?.cart?.id
        const customerToken = data?.startOciSession?.customerToken
        if (!cartId) {
          return
        }

        client
          .clearStore()
          .then(() => {
            assignCurrentCartId(cartId)

            if (customerToken) {
              const { iat } = JSON.parse(
                Buffer.from(customerToken.split('.')[1], 'base64').toString(),
              )
              client.cache.writeQuery({
                query: CustomerTokenDocument,
                broadcast: true,
                data: {
                  customerToken: {
                    __typename: 'CustomerToken',
                    token: customerToken,
                    createdAt: iat,
                    valid: true,
                  },
                },
              })
            }

            reroute('/')
          })
          .catch(console.error)
      },
    },
  )

  useEffect(() => {
    if (!paramToString(username) || !paramToString(password) || !paramToString(hookUrl)) {
      if (router.isReady) {
        console.warn('Missing param(s)')
      }
      return
    }

    if (sessionData || loading || error) return

    startOciSessionMutation().catch(console.error)
  }, [
    hookUrl,
    loading,
    password,
    router.isReady,
    sessionData,
    startOciSessionMutation,
    username,
    error,
  ])

  return {
    cart: sessionData?.startOciSession?.cart,
    loading: router.isReady ? loading : true,
    error,
  }
}
