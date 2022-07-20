import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { IsEmailAvailableDocument } from '@graphcommerce/magento-customer'
import { extendableComponent, FormRow } from '@graphcommerce/next-ui'
import {
  emailPattern,
  useFormAutoSubmit,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { TextField, Typography, Button, NoSsr, SxProps, Box, Theme } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { CartEmailDocument } from './CartEmail.gql'
import { SetGuestEmailOnCartDocument } from './SetGuestEmailOnCart.gql'

export type EmailFormProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

const name = 'EmailForm' as const
const parts = ['root', 'formRow'] as const
const { classes } = extendableComponent(name, parts)

export const EmailForm = React.memo<EmailFormProps>((props) => {
  const { step, sx } = props

  const cartEmail = useCartQuery(CartEmailDocument, { hydration: true })

  const email = cartEmail.data?.cart?.email ?? ''

  const form = useFormGqlMutationCart(SetGuestEmailOnCartDocument, {
    mode: 'onChange',
    defaultValues: { email },
  })

  const isEmailAvailable = useQuery(IsEmailAvailableDocument, {
    variables: { email },
    skip: !email,
  })

  const { formState, muiRegister, required, error, handleSubmit } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'EmailForm' })
  useFormAutoSubmit({ form, submit })

  return (
    <Box component='form' noValidate onSubmit={submit} sx={sx}>
      <FormRow className={classes.formRow} sx={{ py: 0 }}>
        <TextField
          variant='outlined'
          type='email'
          error={formState.isSubmitted && !!formState.errors.email}
          helperText={formState.isSubmitted && formState.errors.email?.message}
          label={<Trans id='Email' />}
          required={required.email}
          disabled={cartEmail.loading}
          {...muiRegister('email', {
            required: required.email,
            pattern: { value: emailPattern, message: '' },
          })}
          InputProps={{
            autoComplete: 'email',
            endAdornment: (
              <WaitForQueries waitFor={isEmailAvailable}>
                {isEmailAvailable.data?.isEmailAvailable && (
                  <PageLink href='/account/signin' passHref>
                    <Button color='secondary' style={{ whiteSpace: 'nowrap' }}>
                      <Trans id='Sign in' />
                    </Button>
                  </PageLink>
                )}
              </WaitForQueries>
            ),
          }}
        />
      </FormRow>
      <ApolloCartErrorAlert error={error} />
    </Box>
  )
})
