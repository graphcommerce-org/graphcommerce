import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import {
  ActionCard,
  ActionCardLayout,
  Button,
  FormActions,
  FormDiv,
  FormRow,
  LayoutTitle,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Link, SxProps, Theme, Typography } from '@mui/material'
import error from 'next/error'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CustomerDocument, useFormIsEmailAvailable } from '../../hooks'
import { useCustomerQuery } from '../../hooks/useCustomerQuery'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { SignInForm } from '../SignInForm/SignInForm'
import { SignUpForm } from '../SignUpForm/SignUpForm'

export type AccountSignInUpFormProps = { sx?: SxProps<Theme> }

const titleContainerSx: SxProps<Theme> = (theme) => ({
  typography: 'body1',
  marginBottom: theme.spacings.xs,
})

const parts = ['root', 'titleContainer'] as const
const { classes } = extendableComponent('AccountSignInUpForm', parts)

export function AccountSignInUpForm(props: AccountSignInUpFormProps) {
  const { sx = [] } = props
  const customerQuery = useCustomerQuery(CustomerDocument)

  const { email, firstname = '' } = customerQuery.data?.customer ?? {}

  const { mode, form, autoSubmitting, submit } = useFormIsEmailAvailable({ email })
  const { formState, watch, control } = form
  const disableFields = formState.isSubmitting && !autoSubmitting

  const { setValue, trigger } = form
  const router = useRouter()
  useEffect(() => {
    const emailFromParams = router.query.email as string
    if (!email && emailFromParams) {
      setValue('email', emailFromParams)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      trigger('email')
    }
  }, [email, router.query.email, setValue, trigger])

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

      {mode !== 'signedin' && import.meta.graphCommerce.loginMethod === 'TOGGLE' && (
        <ActionCardLayout layout='grid'>
          <ActionCard
            sx={{
              justifySelf: 'flex-end',
              width: { xs: '100%', sm: '50%' },
              '& .MuiBox-root': { justifyContent: 'center', mb: 0 },
              mb: 0,
            }}
            selected={mode === 'signin'}
            layout='grid'
            title='Login'
            value='signin'
            onClick={() => setMode('signin')}
          />
          <ActionCard
            sx={{
              justifySelf: 'flex-start',
              width: { xs: '100%', sm: '50%' },
              '& .MuiBox-root': { justifyContent: 'center', alignContent: 'center' },
            }}
            selected={mode === 'signup'}
            layout='grid'
            value='signup'
            title='Sign up'
            onClick={() => setMode('signup')}
          />
        </ActionCardLayout>
      )}

      {mode === 'signedin' && (
        <Box className={classes.titleContainer} sx={titleContainerSx}>
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
        <form onSubmit={submit}>
          <Box>
            <FormRow>
              <TextFieldElement
                variant='outlined'
                control={control}
                name='email'
                required
                type='email'
                error={formState.isSubmitted && !!formState.errors.email}
                label={<Trans id='Email' />}
                disabled={disableFields}
                InputProps={{
                  endAdornment: formState.isSubmitting && (
                    <CircularProgress sx={{ display: 'inline-flex' }} />
                  ),
                  readOnly: !!email,
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
