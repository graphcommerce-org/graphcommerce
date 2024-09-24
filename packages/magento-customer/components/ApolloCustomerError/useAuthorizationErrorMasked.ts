import { ApolloError } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { i18n } from '@lingui/core'
import { useCustomerSession } from '../../hooks/useCustomerSession'

export function useAuthorizationErrorMasked(error?: ApolloError) {
  const { token } = useCustomerSession()

  return graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    mask: token
      ? i18n._(/* i18n */ 'Please reauthenticate and try again')
      : i18n._(/* i18n */ 'You must be signed in to continue'),
    extract: false,
  })
}
