import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Box, FormControl, Link } from '@mui/material'
import { useSignInForm } from '../../hooks/useSignInForm'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'

export type SignInFormProps = { email: string; sx?: SxProps<Theme> }

export function SignInForm(props: SignInFormProps) {
  const { email, sx } = props

  const form = useSignInForm({ email })

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
