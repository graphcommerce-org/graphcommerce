import {
  ApolloCustomerErrorAlert,
  SignInForm,
  SignUpForm,
  useFormIsEmailAvailable,
  CustomerDocument,
} from '@graphcommerce/magento-customer'
import { useCustomerQuery } from '@graphcommerce/magento-customer/hooks'
import {
  Button,
  FormDiv,
  FormActions,
  FormRow,
  LayoutTitle,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { emailPattern } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Link, SxProps, TextField, Theme, Typography } from '@mui/material'
import PageLink from 'next/link'
import router from 'next/router'

export type AccountSignInUpFormProps = { sx?: SxProps<Theme> }

const parts = ['root', 'titleContainer'] as const
const { classes } = extendableComponent('AccountSignInUpForm', parts)

const titleContainerSx: SxProps<Theme> = (theme) => ({
  typography: 'body1',
  marginBottom: theme.spacings.xs,
})

export function AccountSignInUpForm(props: AccountSignInUpFormProps) {
  const { sx = [] } = props
  const customerQuery = useCustomerQuery(CustomerDocument)

  const { email, firstname = '' } = customerQuery.data?.customer ?? {}
  const { mode, form, autoSubmitting, submit } = useFormIsEmailAvailable({ email })
  const { formState, muiRegister, required, watch, error } = form
  const disableFields = formState.isSubmitting && !autoSubmitting

  return (
    <FormDiv sx={sx} className={classes.root}>
      {mode === 'email' && (
        <Box className={classes.titleContainer} sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans id='Sign in or create an account!' />
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans id='Fill in your e-mail to login or create an account' />
          </Typography>
        </Box>
      )}

      {mode === 'signin' && (
        <Box className={classes.titleContainer} sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans id='Welcome back!' />
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans id='Fill in your password' />
          </Typography>
        </Box>
      )}

      {mode === 'signup' && (
        <Box className={classes.titleContainer} sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans id='Create account!' />
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans id='Create a password and tell us your name' />
          </Typography>
        </Box>
      )}

      {mode === 'signedin' && (
        <Box className={classes.titleContainer} sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans id='Hi {firstname}! You’re now logged in!' values={{ firstname }} />
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <PageLink href='/account' passHref legacyBehavior>
              <Link underline='hover' color='secondary'>
                <Trans id='View your account' />
              </Link>
            </PageLink>
          </Typography>

          <FormActions>
            <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
              <Trans id='Continue shopping' />
            </Button>
          </FormActions>
        </Box>
      )}

      {mode === 'session-expired' && (
        <Box className={classes.titleContainer} sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans id='Your session is expired' />
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans id='Log in to continue shopping' />
          </Typography>
        </Box>
      )}

      {mode !== 'signedin' && (
        <form noValidate onSubmit={submit}>
          <Box>
            <FormRow>
              <TextField
                variant='outlined'
                type='text'
                autoComplete='email'
                error={formState.isSubmitted && !!formState.errors.email}
                helperText={formState.isSubmitted && formState.errors.email?.message}
                label={<Trans id='Email' />}
                required={required.email}
                disabled={disableFields}
                {...muiRegister('email', {
                  required: required.email,
                  pattern: { value: emailPattern, message: '' },
                })}
                InputProps={{
                  endAdornment: formState.isSubmitting && <CircularProgress />,
                  readOnly: !!customerQuery.data?.customer?.email,
                }}
              />
            </FormRow>
          </Box>

          <ApolloCustomerErrorAlert error={error} />

          {(mode === 'email' || mode === 'session-expired') && (
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

      {mode === 'signin' && (
        <Box>
          <SignInForm email={watch('email')} />
        </Box>
      )}

      {mode === 'signup' && (
        <Box>
          <SignUpForm email={watch('email')} />
        </Box>
      )}
    </FormDiv>
  )
}
