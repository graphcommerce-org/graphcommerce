import { CheckboxElement, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { DocumentNode } from '@graphcommerce/graphql'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { useCustomerQuery, useCustomerSession } from '@graphcommerce/magento-customer'
import { useFormGqlMutation, useFormPersist } from '@graphcommerce/react-hook-form'
import { Box, SxProps, Theme } from '@mui/material'
import { GetCustomerNewsletterToggleDocument } from '../CustomerNewsletterToggle/GetCustomerNewsLetterToggle.gql'
import { GetCartEmailDocument } from '../SignupNewsletter/GetCartEmail.gql'
import { SubscribeCustomerDocument } from './SubscribeCustomer.gql'
import {
  SubscribeGuestDocument,
  SubscribeGuestMutation,
  SubscribeGuestMutationVariables,
} from './SubscribeGuest.gql'

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

  useFormPersist({ form, name: 'NewsletterSubscribeForm' })

  useFormCompose({ form, step, submit, key: 'NewsletterSubscribeForm' })

  if (isCustomerSubscribed) return null

  return (
    <Box sx={sx}>
      <form onSubmit={submit} noValidate>
        <CheckboxElement color='secondary' control={control} name='subscribe' label={label} />
      </form>
    </Box>
  )
}
