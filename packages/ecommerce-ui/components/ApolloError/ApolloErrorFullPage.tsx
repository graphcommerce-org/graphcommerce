import { ApolloError } from '@graphcommerce/graphql'
import { FullPageMessage, FullPageMessageProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { AlertProps } from '@mui/material/Alert'
import { ApolloErrorAlert } from './ApolloErrorAlert'

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

  const errorCount = error?.graphQLErrors?.length ?? +(error?.networkError ? 1 : 0)

  if (errorCount === 0) return null

  if (errorCount === 1) {
    return (
      <FullPageMessage
        title={error?.graphQLErrors[0].message ?? error?.networkError?.message}
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
