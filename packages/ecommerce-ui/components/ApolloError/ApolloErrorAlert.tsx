import { extendableComponent } from '@graphcommerce/next-ui/Styles/extendableComponent'
import type { ErrorLike } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import type { AlertProps, SxProps, Theme } from '@mui/material'
import { Alert, Box } from '@mui/material'
import { maskNetworkError } from './maskNetworkError'

const { classes, selectors } = extendableComponent('ApolloErrorAlert', ['root', 'alert'] as const)

export type ApolloErrorAlertProps = {
  error?: ErrorLike | null
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
  sx?: SxProps<Theme>
}
export function ApolloErrorAlert(props: ApolloErrorAlertProps) {
  const { error, graphqlErrorAlertProps, networkErrorAlertProps, sx } = props

  if (!error) return null

  // Check if this is a CombinedGraphQLErrors
  const isGraphQLError = CombinedGraphQLErrors.is(error)
  const graphQLErrors = isGraphQLError ? error.errors : []

  return (
    <Box key='alerts'>
      <Box sx={sx} className={classes.root}>
        {graphQLErrors.map((e, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index}>
            <div className={classes.alert}>
              <Alert
                severity='error'
                {...graphqlErrorAlertProps}
                sx={(theme) => ({
                  borderRadius: theme.shape.borderRadius * 1,
                  marginTop: 0.5,
                })}
              >
                {e.message}
              </Alert>
            </div>
          </Box>
        ))}
        {!isGraphQLError && error && (
          <Box key='networkError'>
            <Box
              sx={(theme) => ({
                paddingTop: theme.spacings.xxs,
                paddingBottom: theme.spacings.xxs,
              })}
              className={classes.alert}
              key='networkError'
            >
              <Alert severity='error' {...networkErrorAlertProps}>
                {maskNetworkError(error)}
              </Alert>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

ApolloErrorAlert.selectors = selectors
