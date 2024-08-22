import { EmailElement, FormAutoSubmit } from '@graphcommerce/ecommerce-ui'
import { useApolloClient } from '@graphcommerce/graphql'
import {
  ActionCard,
  ActionCardListForm,
  Button,
  FormActions,
  FormDiv,
  FormRow,
  LayoutTitle,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Alert, Box, CircularProgress, Link, SxProps, Theme, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { CustomerDocument, useAccountSignInUpForm, useCustomerAccountCanSignUp } from '../../hooks'
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
  const customerQuery = useCustomerQuery(CustomerDocument)

  const { email, firstname = '' } = customerQuery.data?.customer ?? {}

  const { mode, form, submit } = useAccountSignInUpForm()
  const { formState, watch, control, error } = form
  const router = useRouter()

  const client = useApolloClient()

  const canSignUp = useCustomerAccountCanSignUp()
  const isToggleMethod = !import.meta.graphCommerce.enableGuestCheckoutLogin || !canSignUp

  const showEmail =
    mode === 'email' ||
    mode === 'session-expired' ||
    mode === 'signin' ||
    (mode === 'signup' && canSignUp)

  return (
    <FormDiv sx={sx} className={classes.root}>
      <Box
        className={classes.titleContainer}
        sx={(theme) => ({ typography: 'body1', marginBottom: theme.spacings.xs })}
      >
        {mode === 'email' && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans id='Sign in or create an account!' />
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans id='Fill in your e-mail to login or create an account' />
            </Typography>
          </>
        )}

        {(mode === 'signin' || (mode === 'signup' && !canSignUp)) && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans id='Sign in' />
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans id='Fill in your password' />
            </Typography>
          </>
        )}

        {mode === 'signup' && canSignUp && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans id='Create account!' />
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans id='Create a password and tell us your name' />
            </Typography>
          </>
        )}

        {mode === 'signedin' && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans id='Hi {firstname}! You’re now logged in!' values={{ firstname }} />
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Link href='/account' underline='hover' color='secondary'>
                <Trans id='View your account' />
              </Link>
            </Typography>

            <FormActions>
              <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
                <Trans id='Continue shopping' />
              </Button>
            </FormActions>
          </>
        )}

        {mode === 'session-expired' && (
          <>
            <LayoutTitle variant='h2' gutterBottom={false}>
              <Trans id='Your session is expired' />
            </LayoutTitle>
            <Typography variant='h6' align='center'>
              <Trans id='Log in to continue shopping' />
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
              { value: 'signin', title: <Trans id='Sign in' /> },
              { value: 'signup', title: <Trans id='Create Account' /> },
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
                        <Trans id='Sign out' />
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
                  <Trans id='Continue' />
                </Button>
              </FormActions>
            </Box>
          )}
        </form>
      )}

      {(mode === 'signin' || mode === 'session-expired') && (
        <Box>
          <SignInForm email={watch('email')} />
        </Box>
      )}

      {mode === 'signup' && canSignUp && (
        <Box>
          <SignUpForm email={watch('email')} />
        </Box>
      )}
      {mode === 'signup' && !canSignUp && (
        <Box>
          {signUpDisabled || (
            <Alert severity='success'>
              <Trans id='Sign up is disabled, please contact us for more information.' />
            </Alert>
          )}
        </Box>
      )}
    </FormDiv>
  )
}
