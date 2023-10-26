import { globalApolloClient } from '@graphcommerce/graphql'
import { ApolloLink, fromPromise, onError, setContext } from '@graphcommerce/graphql/apollo'
import { ErrorCategory } from '@graphcommerce/magento-graphql'
import { GraphQLError } from 'graphql'
import { UseCustomerValidateTokenDocument } from '../hooks/UseCustomerValidateToken.gql'
import { CustomerTokenDocument } from '../hooks'
import { NextRouter } from 'next/router'

function isErrorCategory(err: GraphQLError, category: ErrorCategory) {
  return err.extensions?.category === category
}

// function getValidToken(tokenQuery: CustomerTokenQuery): null | undefined | false | string {
//   if (!tokenQuery.customerToken) return null

//   const { token, createdAt } = tokenQuery.customerToken
//   if (!token || !createdAt) return null

//   try {
//     const decoded = jwtDecode<JwtPayload>(token)
//     if (decoded.exp && new Date(decoded.exp * 1000).getTime() - new Date().getTime() > 0) {
//       return token
//     }
//     /**
//      * If we're running an older Magento version we're not getting a jwt token with an expiration,
//      * so we fallback to a fixed expiration time
//      */
//     const TOKEN_EXPIRATION_MS = 60 * 60 * 1000
//     if (new Date().getTime() - new Date(createdAt).getTime() < TOKEN_EXPIRATION_MS) {
//       return token
//     }
//   } catch {
//     return token
//   }
// }

const addTokenHeader = setContext((_, context) => {
  if (!context.headers) context.headers = {}

  try {
    const query = context.cache.readQuery({ query: CustomerTokenDocument })

    if (query?.customerToken?.token) {
      context.headers.authorization = `Bearer ${query?.customerToken?.token}`
      return context
    }
    return context
  } catch (error) {
    return context
  }
})

// const authorizationHeaderLink = new ApolloLink((operation, forward) => {
//   const oldHeaders = operation.getContext().headers
//   operation.setContext({
//     headers: {
//       ...oldHeaders,
//       authorization: `Bearer ${result}`,
//     },
//   })

//   return forward(operation).map(() => {
//     const error = new ForbiddenError('Access denied')
//     return { errors: [error], data: null }
//   })
// })

const customerErrorLink = (router: NextRouter) => onError((context) => {
  const { graphQLErrors, operation, forward} = context
  const client = globalApolloClient.current
  if (!client) return undefined

  const oldHeaders = operation.getContext().headers
  const email = client.cache.readQuery({ query: UseCustomerValidateTokenDocument })?.customer?.email
  const authError = graphQLErrors?.find((err) => isErrorCategory(err, 'graphql-authorization'))

  /** If the error we're dealing with is not an authorization error, we're done. */
  if (!authError) return undefined

  if (!oldHeaders.authorization) {
    console.error(
      'No authorization header found in request, but an authorization error was returned, this is a bug. This is the operation:',
      operation,
    )
    return undefined
  }

  if (!email) {
    console.log("A customerToken is found, but there no known email, so we can't sign in again.")
    client.cache.evict({ fieldName: 'customerToken', broadcast: true })
    return undefined
  }



  return fromPromise(router.push('account/signin')).flatMap((result) => {
    if (!result) return forward(operation)

    // Modify the operation context with a new token
    operation.setContext({
      headers: {
        ...oldHeaders,
        authorization: `Bearer ${result}`,
      },
    })


    // retry the request, returning the new observable
    return forward(operation)
  })
})

export const customerLink = (router: NextRouter) =>  ApolloLink.from([addTokenHeader, customerErrorLink(router)])