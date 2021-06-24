import { ApolloError } from '@apollo/client'
import { AlertProps } from '@material-ui/lab'
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

  return (
    <FullPageMessage
      title='An error occured'
      description={<ApolloErrorAlert error={error} />}
      {...fullPageMessageProps}
    />
  )
}
