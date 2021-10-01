import { ApolloError } from '@apollo/client'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Alert } from '@mui/material';
import { AlertProps } from '@mui/lab';
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import AnimatedRow from '../AnimatedRow'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    alerts: {},
    alert: {
      paddingTop: `calc(${theme.spacings.xxs} / 2)`,
      paddingBottom: `calc(${theme.spacings.xxs} / 2)`,
    },
  }),
  { name: 'ApolloErrorAlert' },
)

export type ApolloErrorAlertProps = {
  error?: ApolloError
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
}
export default function ApolloErrorAlert(props: ApolloErrorAlertProps) {
  const classes = useStyles()
  const { error, graphqlErrorAlertProps, networkErrorAlertProps } = props

  return (
    <AnimatePresence initial={false}>
      {error && (
        <AnimatedRow key='alerts'>
          <div className={classes.alerts}>
            <AnimatePresence initial={false}>
              {error.graphQLErrors.map((e, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <AnimatedRow key={index}>
                  <div className={classes.alert}>
                    <Alert severity='error' {...graphqlErrorAlertProps}>
                      {e.message}
                    </Alert>
                  </div>
                </AnimatedRow>
              ))}
              {error.networkError && (
                <AnimatedRow key='networkError'>
                  <div className={classes.alert} key='networkError'>
                    <Alert severity='error' {...networkErrorAlertProps}>
                      Network Error: {error.networkError.message}
                    </Alert>
                  </div>
                </AnimatedRow>
              )}
            </AnimatePresence>
          </div>
        </AnimatedRow>
      )}
    </AnimatePresence>
  )
}
