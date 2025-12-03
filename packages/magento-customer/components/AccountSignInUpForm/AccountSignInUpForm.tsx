import { ActionCardListForm, EmailElement, FormAutoSubmit } from '@graphcommerce/ecommerce-ui'
import { useApolloClient } from '@graphcommerce/graphql'
import { enableGuestCheckoutLogin } from '@graphcommerce/next-config/config'
import {
  ActionCard,
  Button,
  extendableComponent,
  FormActions,
  FormDiv,
  FormRow,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Alert, Box, CircularProgress, Link, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {
  CustomerDocument,
  useAccountSignInUpForm,
  useCustomerAccountCanSignUp,
  UseCustomerValidateTokenDocument,
} from '../../hooks'
import { useCustomerQuery } from '../../hooks/useCustomerQuery'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { SignInForm } from '../SignInForm/SignInForm'
import { signOut } from '../SignOutForm/signOut'
import { SignUpForm } from '../SignUpForm/SignUpForm'

export type AccountSignInUpFormProps = {
  sx?: SxProps<Theme>
  signUpDisabled?: React.ReactNode
}

const parts = ['root', 'titleContainer'] as const
const { classes } = extendableComponent('AccountSignInUpForm', parts)

export function AccountSignInUpForm(props: AccountSignInUpFormProps) {
  const { sx = [], signUpDisabled } = props
  const customerEmailQuery = useCustomerQuery(UseCustomerValidateTokenDocument)
  const customerQuery = useCustomerQuery(CustomerDocument)

  const { email } = customerEmailQuery.data?.customer ?? {}
  const { firstname = '' } = customerQuery.data?.customer ?? {}

  const { mode, form, submit } = useAccountSignInUpForm()
  const { formState, control, error, setError, clearErrors, watch } = form
  const router = useRouter()

  const client = useApolloClient()

  const canSignUp = useCustomerAccountCanSignUp()
  const isToggleMethod = !enableGuestCheckoutLogin || !canSignUp

  const showEmail =
    mode === 'email' ||
    mode === 'session-expired' ||
    mode === 'signin' ||
    (mode === 'signup' && canSignUp)

  const emailValue = watch('email')

  return (
    <FormDiv sx={sx} className={classes.root}>
      <Box
        className={classes.titleContainer}
        sx={(theme) => ({ typography: 'body1', marginBottom: theme.spacings.xs })}
      >
        {mode === 'email' && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans>Sign in or create an account!</Trans>
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans>Fill in your e-mail to login or create an account</Trans>
            </Typography>
          </>
        )}

        {(mode === 'signin' || (mode === 'signup' && !canSignUp)) && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans>Sign in</Trans>
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans>Fill in your password</Trans>
            </Typography>
          </>
        )}

        {mode === 'signup' && canSignUp && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans>Create account!</Trans>
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans>Create a password and tell us your name</Trans>
            </Typography>
          </>
        )}

        {mode === 'signedin' && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans>Hi {firstname}! You’re now logged in!</Trans>
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Link href='/account' underline='hover' color='secondary'>
                <Trans>View your account</Trans>
              </Link>
            </Typography>

            <FormActions>
              <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
                <Trans>Continue shopping</Trans>
              </Button>
            </FormActions>
          </>
        )}

        {mode === 'session-expired' && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans>Your session is expired</Trans>
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans>Log in to continue shopping</Trans>
            </Typography>
          </>
        )}
      </Box>

      {isToggleMethod && (mode === 'signin' || mode === 'signup' || mode === 'email') && (
        <FormRow>
          <ActionCardListForm
            control={form.control}
            name='requestedMode'
            layout='grid'
            size='large'
            render={ActionCard}
            sx={(theme) => ({
              '&.layoutGrid': {
                gridTemplateColumns: 'auto auto',
                justifyContent: 'center',
              },
              '& .ActionCard-root.sizeLarge': {
                px: theme.spacings.md,
              },
            })}
            items={[
              { value: 'signin', title: <Trans>Sign in</Trans> },
              { value: 'signup', title: <Trans>Create Account</Trans> },
            ]}
          />
        </FormRow>
      )}

      {showEmail && (
        <form onSubmit={submit}>
          <FormAutoSubmit {...form} submit={submit} />
          <Box>
            <FormRow>
              <EmailElement
                variant='outlined'
                control={control}
                name='email'
                required
                InputProps={{
                  endAdornment:
                    mode === 'session-expired' ? (
                      <Button
                        type='submit'
                        variant='inline'
                        color='primary'
                        loading={formState.isSubmitting}
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => {
                          signOut(client)
                          form.resetField('email')
                        }}
                      >
                        <Trans>Sign out</Trans>
                      </Button>
                    ) : (
                      formState.isSubmitting && <CircularProgress sx={{ display: 'inline-flex' }} />
                    ),
                  readOnly: !!email,
                }}
              />
            </FormRow>
          </Box>

          <ApolloCustomerErrorAlert error={error} />

          {mode === 'email' && (
            <Box>
              <FormActions>
                <Button
                  type='submit'
                  loading={formState.isSubmitting}
                  variant='pill'
                  color='primary'
                  size='large'
                >
                  <Trans>Continue</Trans>
                </Button>
              </FormActions>
            </Box>
          )}
        </form>
      )}

      {(mode === 'signin' || mode === 'session-expired') && (
        <Box>
          <SignInForm email={emailValue} setError={setError} clearErrors={clearErrors} />
        </Box>
      )}

      {mode === 'signup' && canSignUp && (
        <Box>
          <SignUpForm email={emailValue} setError={setError} clearErrors={clearErrors} />
        </Box>
      )}
      {mode === 'signup' && !canSignUp && (
        <Box>
          {signUpDisabled || (
            <Alert severity='success'>
              <Trans>Sign up is disabled, please contact us for more information.</Trans>
            </Alert>
          )}
        </Box>
      )}
    </FormDiv>
  )
}
