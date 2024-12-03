import type { UseFormClearErrors, UseFormSetError } from '@graphcommerce/ecommerce-ui'
import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import type { Exact, Scalars } from '@graphcommerce/graphql-mesh'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Box, FormControl, Link } from '@mui/material'
import { useSignInForm } from '../../hooks/useSignInForm'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'

export type SignInFormProps = {
  email?: string
  sx?: SxProps<Theme>
  emailIsValid?: boolean
  setError: UseFormSetError<
    Exact<{
      email: Scalars['String']['input']
    }> & {
      requestedMode?: 'signin' | 'signup'
    }
  >
  clearErrors: UseFormClearErrors<
    Exact<{
      email: Scalars['String']['input']
    }> & {
      requestedMode?: 'signin' | 'signup'
    }
  >
}

export function SignInForm(props: SignInFormProps) {
  const { email, sx, emailIsValid, setError, clearErrors } = props

  const form = useSignInForm({
    email,
    onBeforeSubmit(variables) {
      if (!emailIsValid) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setError('email', { message: t`Please enter a valid email address` })
        return false
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      clearErrors()
      return variables
    },
  })

  const { handleSubmit, required, formState, error, control } = form
  const [remainingError, authError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })

  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler} noValidate sx={sx}>
      <FormRow sx={{ gridTemplateColumns: 'none' }}>
        <PasswordElement
          variant='outlined'
          error={!!formState.errors.password || !!authError}
          control={control}
          name='password'
          label={<Trans id='Password' />}
          autoFocus={!!email}
          autoComplete='current-password'
          id='current-password'
          required={required.password}
          disabled={formState.isSubmitting}
          helperText={!!formState.errors.password || authError?.message}
          InputProps={{
            endAdornment: (
              <Link href='/account/forgot-password' underline='hover' sx={{ whiteSpace: 'nowrap' }}>
                <Trans id='Forgot password?' />
              </Link>
            ),
          }}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={remainingError} key='error' />

      <FormActions>
        <FormControl>
          <Button
            type='submit'
            loading={formState.isSubmitting}
            color='primary'
            variant='pill'
            size='large'
          >
            <Trans id='Sign in' />
          </Button>
        </FormControl>
      </FormActions>
    </Box>
  )
}
