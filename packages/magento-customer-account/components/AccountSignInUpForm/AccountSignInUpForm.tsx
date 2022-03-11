import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCustomerErrorAlert,
  SignInForm,
  SignUpForm,
  useFormIsEmailAvailable,
  CustomerDocument,
  CustomerTokenDocument,
} from '@graphcommerce/magento-customer'
import {
  AnimatedRow,
  Button,
  FormDiv,
  FormActions,
  FormRow,
  LayoutTitle,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { emailPattern, useFormPersist } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, CircularProgress, Link, SxProps, TextField, Theme, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import router from 'next/router'

export type AccountSignInUpFormProps = { sx?: SxProps<Theme> }

const parts = ['root', 'titleContainer'] as const
const { classes } = extendableComponent('AccountSignInUpForm', parts)

export function AccountSignInUpForm(props: AccountSignInUpFormProps) {
  const { sx = [] } = props
  const customerToken = useQuery(CustomerTokenDocument)
  const customerQuery = useQuery(CustomerDocument, {
    ssr: false,
    skip: typeof customerToken.data === 'undefined',
  })

  const { email, firstname = '' } = customerQuery.data?.customer ?? {}
  const { mode, form, autoSubmitting, submit } = useFormIsEmailAvailable({ email })
  const { formState, muiRegister, required, watch, error } = form
  const disableFields = formState.isSubmitting && !autoSubmitting

  useFormPersist({ form, name: 'IsEmailAvailable' })

  const titleContainerSx: SxProps<Theme> = (theme) => ({
    typography: 'body1',
    marginBottom: theme.spacings.xs,
  })

  return (
    <FormDiv sx={sx} className={classes.root}>
      {mode === 'email' && (
        <Box className={classes.titleContainer} key='email' sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Sign in or create an account!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Fill in your e-mail to login or create an account</Trans>
          </Typography>
        </Box>
      )}

      {mode === 'signin' && (
        <Box className={classes.titleContainer} key='signin' sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Welcome back!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Fill in your password</Trans>
          </Typography>
        </Box>
      )}

      {mode === 'signup' && (
        <Box className={classes.titleContainer} key='signup' sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Create account!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Create a password and tell us your name</Trans>
          </Typography>
        </Box>
      )}

      {mode === 'signedin' && (
        <Box className={classes.titleContainer} key='signup' sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Hi {firstname}! You're now logged in!</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <PageLink href='/account' passHref>
              <Link underline='hover'>
                <Trans>View your account</Trans>
              </Link>
            </PageLink>
          </Typography>

          <FormActions>
            <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
              <Trans>Continue shopping</Trans>
            </Button>
          </FormActions>
        </Box>
      )}

      {mode === 'session-expired' && (
        <Box className={classes.titleContainer} key='email' sx={titleContainerSx}>
          <LayoutTitle variant='h2' gutterBottom={false}>
            <Trans>Your session is expired</Trans>
          </LayoutTitle>
          <Typography variant='h6' align='center'>
            <Trans>Log in to continue shopping</Trans>
          </Typography>
        </Box>
      )}

      <AnimatePresence>
        {mode !== 'signedin' && (
          <form noValidate onSubmit={submit} key='emailform'>
            <AnimatedRow key='email'>
              <FormRow>
                <TextField
                  key='email'
                  variant='outlined'
                  type='text'
                  autoComplete='email'
                  error={formState.isSubmitted && !!formState.errors.email}
                  helperText={formState.isSubmitted && formState.errors.email?.message}
                  label={<Trans>Email</Trans>}
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
            </AnimatedRow>

            <ApolloCustomerErrorAlert error={error} />

            {(mode === 'email' || mode === 'session-expired') && (
              <AnimatedRow key='submit-form'>
                <FormActions>
                  <Button
                    type='submit'
                    loading={formState.isSubmitting}
                    variant='contained'
                    color='primary'
                    size='large'
                  >
                    <Trans>Continue</Trans>
                  </Button>
                </FormActions>
              </AnimatedRow>
            )}
          </form>
        )}

        {mode === 'signin' && (
          <AnimatedRow key='signin'>
            <SignInForm email={watch('email')} />
          </AnimatedRow>
        )}

        {mode === 'signup' && (
          <AnimatedRow key='signup'>
            <SignUpForm email={watch('email')} />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </FormDiv>
  )
}
