import type { ApolloError } from '@graphcommerce/graphql'
import type { FullPageMessageProps } from '@graphcommerce/next-ui'
import { FullPageMessage } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { AlertProps } from '@mui/material'
import { ApolloErrorAlert } from './ApolloErrorAlert'
import { maskNetworkError } from './maskNetworkError'

export type ApolloErrorFullPageProps = {
  error: ApolloError
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

  const errorCount = (error?.graphQLErrors?.length ?? 0) + (error?.networkError ? 1 : 0)

  if (errorCount === 0) return null

  if (errorCount === 1) {
    return (
      <FullPageMessage
        title={error?.graphQLErrors?.[0]?.message ?? maskNetworkError(error.networkError)}
        {...fullPageMessageProps}
      >
        {children}
      </FullPageMessage>
    )
  }

  return (
    <FullPageMessage title={<Trans id='Several errors occured' />} {...fullPageMessageProps}>
      <ApolloErrorAlert error={error} />
    </FullPageMessage>
  )
}
