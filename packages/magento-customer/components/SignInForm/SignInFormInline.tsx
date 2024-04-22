import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import { Button, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Link, SxProps, Theme } from '@mui/material'
import { useSignInForm } from '../../hooks/useSignInForm'
import { SignInMutationVariables } from './SignIn.gql'

type InlineSignInFormProps = Omit<SignInMutationVariables, 'password'> & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

const { classes } = extendableComponent('SignInFormInline', ['form', 'button'] as const)

export function SignInFormInline(props: InlineSignInFormProps) {
  const { email, children, sx = [] } = props
  const form = useSignInForm({ email })

  const { handleSubmit, required, formState, control } = form
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
      <PasswordElement
        control={control}
        variant='outlined'
        name='password'
        label={<Trans id='Password' />}
        autoFocus
        autoComplete='current-password'
        id='current-password'
        required={required.password}
        disabled={formState.isSubmitting}
        InputProps={{
          endAdornment: (
            <Link href='/account/forgot-password' underline='hover' sx={{ whiteSpace: 'nowrap' }}>
              <Trans id='Forgot password?' />
            </Link>
          ),
        }}
      />
      <Button
        type='submit'
        loading={formState.isSubmitting}
        color='secondary'
        variant='pill'
        sx={{ alignSelf: 'start', marginTop: (theme) => `calc(${theme.spacings.xxs} * .33)` }}
      >
        <Trans id='Sign in' />
      </Button>
      {children}
    </Box>
  )
}
