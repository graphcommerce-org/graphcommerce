import { EmailElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import {
  IsEmailAvailableDocument,
  useCustomerAccountCanSignIn,
  useCustomerSession,
} from '@graphcommerce/magento-customer'
import { extendableComponent, FormRow } from '@graphcommerce/next-ui'
import type { UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { FormAutoSubmit, useFormCompose } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import type { SxProps, Theme } from '@mui/material'
import { Box, Button } from '@mui/material'
import React from 'react'
import { CartEmailDocument } from './CartEmail.gql'
import { SetGuestEmailOnCartDocument } from './SetGuestEmailOnCart.gql'

export type EmailFormProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

const name = 'EmailForm'
const parts = ['root', 'formRow'] as const
const { classes } = extendableComponent(name, parts)

const EmailFormBase = React.memo<EmailFormProps>((props) => {
  const { step, sx } = props

  const canLogin = useCustomerAccountCanSignIn()

  const cartEmail = useCartQuery(CartEmailDocument)

  const form = useFormGqlMutationCart(SetGuestEmailOnCartDocument, {
    skipUnchanged: true,
    defaultValues: { email: cartEmail.data?.cart?.email ?? '' },
  })
  const email = form.watch('email')

  const isEmailAvailable = useQuery(IsEmailAvailableDocument, {
    variables: { email },
    skip: !import.meta.graphCommerce.enableGuestCheckoutLogin || !email,
  })

  const { required, error, handleSubmit } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'EmailForm' })

  const showLogin =
    import.meta.graphCommerce.enableGuestCheckoutLogin &&
    canLogin &&
    isEmailAvailable.data?.isEmailAvailable

  return (
    <Box component='form' noValidate onSubmit={submit} sx={sx}>
      <FormAutoSubmit control={form.control} submit={submit} />
      <FormRow className={classes.formRow} sx={{ py: 0 }}>
        <EmailElement
          control={form.control}
          name='email'
          variant='outlined'
          required={required.email}
          disabled={cartEmail.loading}
          InputProps={{
            autoComplete: 'email',
            endAdornment: showLogin && (
              <Button
                href={`/account/signin?email=${email}`}
                color='secondary'
                style={{ whiteSpace: 'nowrap' }}
              >
                <Trans id='Sign in' />
              </Button>
            ),
          }}
        />
      </FormRow>
      <ApolloCartErrorAlert error={error} />
    </Box>
  )
})

export function EmailForm(props: EmailFormProps) {
  const { loggedIn } = useCustomerSession()
  if (loggedIn) return null
  return <EmailFormBase {...props} />
}
