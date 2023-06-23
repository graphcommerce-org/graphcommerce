import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import { useApolloClient } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  Button,
  FormRow,
  FormActions,
  iconEyeCrossed,
  iconEye,
  IconSvg,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, FormControl, IconButton, InputAdornment, Link, SxProps, Theme } from '@mui/material'
import { MouseEvent, useState } from 'react'
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
        const oldEmail = client.cache.readQuery({ query: CustomerDocument })?.customer?.email

        /**
         * We are logging in because the session expired, but we're logging in with a different
         * email address, we need to reset the store.
         */
        if (oldEmail && oldEmail !== email) await client.resetStore()
        return { ...values, email }
      },
    },
    { errorPolicy: 'all' },
  )

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
          autoFocus
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
            <Trans id='Log in' />
          </Button>
        </FormControl>
      </FormActions>
    </Box>
  )
}
