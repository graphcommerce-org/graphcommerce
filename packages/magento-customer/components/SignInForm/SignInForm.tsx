import { useApolloClient } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormRow, FormActions } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, FormControl, Link, SxProps, TextField, Theme } from '@mui/material'
import PageLink from 'next/link'
import { CustomerDocument } from '../../hooks'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignInDocument } from './SignIn.gql'

type SignInFormProps = { email: string; sx?: SxProps<Theme> }

export function SignInForm(props: SignInFormProps) {
  const { email, sx } = props

  const client = useApolloClient()
  const form = useFormGqlMutation(
    SignInDocument,
    {
      defaultValues: { email },
      onBeforeSubmit: async (values) => {
        const oldEmail = client.cache.readQuery({ query: CustomerDocument })
        if (oldEmail?.customer?.email !== email) {
          await client.resetStore()
        }
        return { ...values, email }
      },
    },
    { errorPolicy: 'all' },
  )

  const { muiRegister, handleSubmit, required, formState, error } = form
  const [remainingError, authError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler} noValidate sx={sx}>
      <FormRow>
        <TextField
          key='password'
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!authError}
          label={<Trans id='Password' />}
          autoFocus
          autoComplete='current-password'
          id='current-password'
          required={required.password}
          {...muiRegister('password', { required: required.password })}
          InputProps={{
            endAdornment: (
              <PageLink href='/account/forgot-password' key='forgot-password' passHref>
                <Link underline='hover' sx={{ whiteSpace: 'nowrap' }}>
                  <Trans id='Forgot password?' />
                </Link>
              </PageLink>
            ),
          }}
          helperText={formState.errors.password?.message || authError?.message}
          disabled={formState.isSubmitting}
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
            <Trans id='Log in' />
          </Button>
        </FormControl>
      </FormActions>
    </Box>
  )
}
