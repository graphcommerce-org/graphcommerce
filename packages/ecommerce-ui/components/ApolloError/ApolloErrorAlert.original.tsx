import type { ApolloError } from '@graphcommerce/graphql'
import { extendableComponent } from '@graphcommerce/next-ui/Styles/extendableComponent'
import type { AlertProps, SxProps, Theme } from '@mui/material'
import { Alert, Box } from '@mui/material'
import { maskNetworkError } from './maskNetworkError'

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
    <>
      {error && (
        <Box key='alerts'>
          <Box sx={sx} className={classes.root}>
            {error.graphQLErrors.map((e, index) => (
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
            {error.networkError && (
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
                    {maskNetworkError(error.networkError)}
                  </Alert>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

ApolloErrorAlert.selectors = selectors
