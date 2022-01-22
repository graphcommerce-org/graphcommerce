import { ApolloError } from '@apollo/client'
import { AlertProps, Alert, Box, SxProps, Theme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { AnimatedRow } from '../AnimatedRow'
import { componentSlots } from '../Styles/componentSlots'

const { componentName, classes, selectors } = componentSlots('ApolloErrorAlert', ['alert'] as const)

export type ApolloErrorAlertProps = {
  error?: ApolloError
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
  sx?: SxProps<Theme>
}
export default function ApolloErrorAlert(props: ApolloErrorAlertProps) {
  const { error, graphqlErrorAlertProps, networkErrorAlertProps, sx } = props

  return (
    <AnimatePresence initial={false}>
      {error && (
        <AnimatedRow key='alerts'>
          <Box sx={sx} className={componentName}>
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
                  <Box
                    sx={{
                      paddingTop: theme.spacings.xxs,
                      paddingBottom: theme.spacings.xxs,
                    }}
                    className={classes.alert}
                    key='networkError'
                  >
                    <Alert severity='error' {...networkErrorAlertProps}>
                      Network Error: {error.networkError.message}
                    </Alert>
                  </Box>
                </AnimatedRow>
              )}
            </AnimatePresence>
          </Box>
        </AnimatedRow>
      )}
    </AnimatePresence>
  )
}

ApolloErrorAlert.selectors = selectors
