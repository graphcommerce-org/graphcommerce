import type { FullPageMessageProps } from '@graphcommerce/next-ui'
import { FullPageMessage } from '@graphcommerce/next-ui'
import type { ErrorLike } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { Trans } from '@lingui/react/macro'
import type { AlertProps } from '@mui/material'
import { ApolloErrorAlert } from './ApolloErrorAlert'
import { maskNetworkError } from './maskNetworkError'

export type ApolloErrorFullPageProps = {
  error: ErrorLike
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
} & Omit<FullPageMessageProps, 'title' | 'description'>

export function ApolloErrorFullPage(props: ApolloErrorFullPageProps) {
  const {
    error,
    graphqlErrorAlertProps,
    networkErrorAlertProps,
    children,
    ...fullPageMessageProps
  } = props

  // Check if this is a CombinedGraphQLErrors
  const isGraphQLError = CombinedGraphQLErrors.is(error)
  const graphQLErrors = isGraphQLError ? error.errors : []
  const errorCount = graphQLErrors.length + (isGraphQLError ? 0 : 1)

  if (errorCount === 0) return null

  if (errorCount === 1) {
    return (
      <FullPageMessage
        title={graphQLErrors[0]?.message ?? maskNetworkError(error)}
        {...fullPageMessageProps}
      >
        {children}
      </FullPageMessage>
    )
  }

  return (
    <FullPageMessage title={<Trans>Several errors occured</Trans>} {...fullPageMessageProps}>
      <ApolloErrorAlert error={error} />
    </FullPageMessage>
  )
}
