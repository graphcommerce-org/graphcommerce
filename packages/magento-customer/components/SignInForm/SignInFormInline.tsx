import { Button, extendableComponent } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, SxProps, TextField, Theme } from '@mui/material'
import PageLink from 'next/link'
import { PropsWithChildren } from 'react'
import { SignInDocument, SignInMutationVariables } from './SignIn.gql'

type InlineSignInFormProps = Omit<SignInMutationVariables, 'password'> & { sx?: SxProps<Theme> }

const { classes } = extendableComponent('SignInFormInline', ['form', 'button'] as const)

export default function SignInFormInline(props: PropsWithChildren<InlineSignInFormProps>) {
  const { email, sx = [] } = props
  const form = useFormGqlMutation(
    SignInDocument,
    { defaultValues: { email } },
    { errorPolicy: 'all' },
  )
  const { muiRegister, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      noValidate
      className={classes.form}
      sx={[
        (theme) => ({
          display: 'grid',
          alignItems: 'center',
          gridRowGap: theme.spacings.sm,
          gridColumnGap: theme.spacings.xs,
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '5fr 1fr',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <TextField
        variant='outlined'
        type='password'
        error={!!formState.errors.password || !!error?.message}
        label={<Trans>Password</Trans>}
        autoFocus
        autoComplete='current-password'
        id='current-password'
        required={required.password}
        {...muiRegister('password', { required: required.password })}
        helperText={error?.message}
        disabled={formState.isSubmitting}
        InputProps={{
          endAdornment: (
            <PageLink href='/account/forgot-password' key='forgot-password' passHref>
              <Button
                color='secondary'
                variant='text'
                className={classes.button}
                sx={{ minWidth: 'max-content' }}
              >
                <Trans>Forgot password?</Trans>
              </Button>
            </PageLink>
          ),
        }}
      />
      <Button type='submit' loading={formState.isSubmitting} color='secondary' variant='pill'>
        <Trans>Sign in</Trans>
      </Button>
    </Box>
  )
}
