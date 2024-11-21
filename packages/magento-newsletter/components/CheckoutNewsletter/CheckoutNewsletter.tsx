import { CheckboxElement, useFormCompose } from '@graphcommerce/ecommerce-ui'
import type { DocumentNode } from '@graphcommerce/graphql'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { useCustomerQuery, useCustomerSession } from '@graphcommerce/magento-customer'
import { FormPersist, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { GetCustomerNewsletterToggleDocument } from '../CustomerNewsletterToggle/GetCustomerNewsLetterToggle.gql'
import { GetCartEmailDocument } from '../SignupNewsletter/GetCartEmail.gql'
import { SubscribeCustomerDocument } from './SubscribeCustomer.gql'
import type { SubscribeGuestMutation, SubscribeGuestMutationVariables } from './SubscribeGuest.gql'
import { SubscribeGuestDocument } from './SubscribeGuest.gql'

type CheckoutNewsletterProps = {
  step: number
  checked?: boolean
  label: string
  sx?: SxProps<Theme>
}

export function SubscribeToNewsletter(props: CheckoutNewsletterProps) {
  const { step, checked = false, label, sx } = props
  const cartEmail = useCartQuery(GetCartEmailDocument).data?.cart?.email

  const { loggedIn } = useCustomerSession()
  const isCustomerSubscribed = useCustomerQuery(GetCustomerNewsletterToggleDocument).data?.customer
    ?.is_subscribed

  const form = useFormGqlMutation<
    SubscribeGuestMutation,
    SubscribeGuestMutationVariables & { subscribe: boolean }
  >(
    loggedIn ? (SubscribeCustomerDocument as DocumentNode) : SubscribeGuestDocument,
    {
      defaultValues: { subscribe: checked },
      onBeforeSubmit: ({ subscribe }) =>
        subscribe ? { subscribe, email: cartEmail ?? '' } : false,
    },
    { errorPolicy: 'all' },
  )
  const { control, handleSubmit } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'NewsletterSubscribeForm' })

  if (isCustomerSubscribed) return null

  return (
    <Box sx={sx}>
      <form onSubmit={submit} noValidate>
        <CheckboxElement color='secondary' control={control} name='subscribe' label={label} />
      </form>
      <FormPersist form={form} name='NewsletterSubscribeForm' />
    </Box>
  )
}
