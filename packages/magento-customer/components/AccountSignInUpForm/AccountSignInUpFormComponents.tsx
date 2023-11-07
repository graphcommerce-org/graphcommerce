import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import {
  Button,
  FormDiv,
  FormActions,
  FormRow,
  LayoutTitle,
  ActionCard,
  ActionCardLayout,
} from '@graphcommerce/next-ui'
import { useFormContext } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Link, SxProps, Theme, Typography } from '@mui/material'
import router from 'next/router'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useCustomerSession } from '../../hooks'
import { SignInForm } from '../SignInForm/SignInForm'
import { SignUpForm } from '../SignUpForm/SignUpForm'

export type AccountSignInUpFormComponentProps = {
  sx?: SxProps<Theme>
  titleContainerSx: SxProps<Theme>
  mode: 'email' | 'signin' | 'signup' | 'signedin' | 'session-expired'
  autoSubmitting?: boolean
  submit?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  classes: {
    root: string
    titleContainer: string
  }
  firstName: string
  email?: string | null
}

export function AccountSignInUpFormComponents(props: AccountSignInUpFormComponentProps) {
  const {
    sx = [],
    mode: loginMode,
    autoSubmitting,
    submit,
    classes,
    titleContainerSx,
    firstName: firstname,
    email,
  } = props

  const form = useFormContext()

  const { formState, watch, control } = form

  const disableFields = formState.isSubmitting && !autoSubmitting

  const { loggedIn } = useCustomerSession()

  const [mode, setMode] = useState(loginMode)

  useEffect(() => {
    setMode(loginMode)
    if (loggedIn) {
      setMode('signedin')
    }
  }, [loggedIn, loginMode])

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

      {mode !== 'signedin' && form && (
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
