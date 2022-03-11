import { ApolloError } from '@graphcommerce/graphql'
import { AnimatedRow } from '@graphcommerce/next-ui'
import { extendableComponent } from '@graphcommerce/next-ui/Styles/extendableComponent'
import { AlertProps, Alert, Box, SxProps, Theme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'

const { classes, selectors } = extendableComponent('ApolloErrorAlert', ['root', 'alert'] as const)

export type ApolloErrorAlertProps = {
  error?: ApolloError
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
  sx?: SxProps<Theme>
}
export function ApolloErrorAlert(props: ApolloErrorAlertProps) {
  const { error, graphqlErrorAlertProps, networkErrorAlertProps, sx } = props

  return (
    <AnimatePresence initial={false}>
      {error && (
        <AnimatedRow key='alerts'>
          <Box sx={sx} className={classes.root}>
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
                    sx={(theme) => ({
                      paddingTop: theme.spacings.xxs,
                      paddingBottom: theme.spacings.xxs,
                    })}
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
