import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormRow, FormActions } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, FormControl, Link, SxProps, TextField, Theme } from '@mui/material'
import PageLink from 'next/link'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignInDocument } from './SignIn.gql'

type SignInFormProps = { email: string; sx?: SxProps<Theme> }

export default function SignInForm(props: SignInFormProps) {
  const { email, sx } = props
  const form = useFormGqlMutation(
    SignInDocument,
    { defaultValues: { email } },
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
          label={<Trans>Password</Trans>}
          autoFocus
          autoComplete='current-password'
          id='current-password'
          required={required.password}
          {...muiRegister('password', { required: required.password })}
          InputProps={{
            endAdornment: (
              <PageLink href='/account/forgot-password' key='forgot-password' passHref>
                <Link
                  className={classes.forgotPass}
                  underline='hover'
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  <Trans>Forgot password?</Trans>
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
            variant='contained'
            size='large'
          >
            <Trans>Log In</Trans>
          </Button>
        </FormControl>
      </FormActions>
    </Box>
  )
}
