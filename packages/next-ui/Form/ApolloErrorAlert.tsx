import { ApolloError } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import AnimatedRow from '../AnimatedRow'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    alerts: {
      // padding: `calc(${theme.spacings.xxs} / 2) 0`,
    },
    alert: {
      paddingTop: `calc(${theme.spacings.xxs} / 2)`,
      paddingBottom: `calc(${theme.spacings.xxs} / 2)`,
    },
  }),
  { name: 'ApolloErrorAlert' },
)

type ApolloErrorAlertProps = {
  error?: ApolloError
}
export default function ApolloErrorAlert(props: ApolloErrorAlertProps) {
  const classes = useStyles()
  const { error } = props

  return (
    <AnimatePresence initial={false}>
      {error && (
        <AnimatedRow key='alerts'>
          <div className={classes.alerts}>
            <AnimatePresence initial={false}>
              {error.graphQLErrors.map((e) => (
                <AnimatedRow key={e.message}>
                  <div className={classes.alert}>
                    <Alert severity='error'>{e.message}</Alert>
                  </div>
                </AnimatedRow>
              ))}
              {error.networkError && (
                <AnimatedRow key='networkError'>
                  <div className={classes.alert} key={error.networkError.message}>
                    <Alert severity='error'>{error.networkError.message}</Alert>
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
