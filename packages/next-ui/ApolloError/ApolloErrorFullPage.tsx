import { ApolloError } from '@apollo/client'
import { AlertProps } from '@mui/lab'
import React from 'react'
import FullPageMessage, { FullPageMessageProps } from '../FullPageMessage'
import ApolloErrorAlert from './ApolloErrorAlert'

export type ApolloErrorFullPageProps = {
  error?: ApolloError
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
} & Omit<FullPageMessageProps, 'title' | 'description'>

export default function ApolloErrorFullPage(props: ApolloErrorFullPageProps) {
  const { error, graphqlErrorAlertProps, networkErrorAlertProps, ...fullPageMessageProps } = props

  const singleError = error?.graphQLErrors.length === 1

  return (
    <FullPageMessage
      title={singleError ? error?.graphQLErrors[0].message : 'Several errors occured'}
      description={singleError ? undefined : <ApolloErrorAlert error={error} />}
      {...fullPageMessageProps}
    />
  )
}
