import { ApolloError } from '@graphcommerce/graphql'
import { extendableComponent } from '@graphcommerce/next-ui/Styles/extendableComponent'
import { Trans } from '@lingui/react'
import { AlertProps, Alert, Box, SxProps, Theme } from '@mui/material'

const { classes, selectors } = extendableComponent('ApolloErrorAlert', ['root', 'alert'] as const)

export type ApolloErrorAlertProps = {
  error?: ApolloError
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
  sx?: SxProps<Theme>
}
export function ApolloErrorAlert(props: ApolloErrorAlertProps) {
  const { error, graphqlErrorAlertProps, networkErrorAlertProps, sx } = props
  const isDevMode = process.env.NODE_ENV === 'development'

  return (
    <>
      {true && (
        <Box key='alerts'>
          <Box sx={sx} className={classes.root}>
            {error?.graphQLErrors.map((e, index) => (
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
                    {isDevMode ? (
                      e.message
                    ) : (
                      <Trans id='Something went wrong. Please try again later.' />
                    )}
                  </Alert>
                </div>
              </Box>
            ))}
            {true && (
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
                    {isDevMode ? (
                      `Network Error: ${error?.networkError.message}`
                    ) : (
                      <Trans id='Something went wrong. Please try again later.' />
                    )}
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
