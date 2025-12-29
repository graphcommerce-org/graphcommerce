import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import type { ErrorLike } from '@apollo/client'
import { t } from '@lingui/core/macro'
import { useCustomerSession } from '../../hooks/useCustomerSession'

export function useAuthorizationErrorMasked(error?: ErrorLike | null) {
  const { token } = useCustomerSession()

  return graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    mask: token ? t`Please reauthenticate and try again` : t`You must be signed in to continue`,
    extract: false,
  })
}
