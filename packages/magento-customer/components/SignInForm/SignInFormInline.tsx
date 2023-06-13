import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import {
  Button,
  IconSvg,
  extendableComponent,
  iconEye,
  iconEyeCrossed,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, IconButton, InputAdornment, SxProps, Theme } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { SignInDocument, SignInMutationVariables } from './SignIn.gql'

type InlineSignInFormProps = Omit<SignInMutationVariables, 'password'> & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

const { classes } = extendableComponent('SignInFormInline', ['form', 'button'] as const)

export function SignInFormInline(props: InlineSignInFormProps) {
  const { email, sx = [] } = props
  const form = useFormGqlMutation(
    SignInDocument,
    { defaultValues: { email }, onBeforeSubmit: (values) => ({ ...values, email }) },
    { errorPolicy: 'all' },
  )
  const { handleSubmit, required, formState, control } = form
  const submitHandler = handleSubmit(() => {})
  const [password, setPassword] = useState<boolean>(true)

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
        type={password ? 'password' : 'text'}
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
            <InputAdornment position='end'>
              <IconButton
                onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                onClick={() => setPassword(!password)}
                tabIndex={-1}
              >
                <IconSvg src={password ? iconEyeCrossed : iconEye} size='medium' />
              </IconButton>

              <Button
                href='/account/forgot-password'
                color='secondary'
                variant='text'
                className={classes.button}
                sx={{ minWidth: 'max-content' }}
              >
                <Trans id='Forgot password?' />
              </Button>
            </InputAdornment>
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
    </Box>
  )
}
