import {
  FormAutoSubmit,
  UseFormComposeOptions,
  useFormCompose,
  useFormPersist,
} from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { ActionCardListForm, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import React, { useMemo } from 'react'
import { findCustomerAddressFromCartAddress } from '../../utils/findCustomerAddressFromCartAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { CustomerAddressActionCard } from './CustomerAddressActionCard'
import { SetCustomerBillingAddressOnCartDocument } from './SetCustomerBillingAddressOnCart.gql'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import { SetCustomerShippingBillingAddressOnCartDocument } from './SetCustomerShippingBillingAddressOnCart.gql'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const { step, children, sx } = props

  const customer = useQuery(CustomerDocument)
  const cart = useCartQuery(GetAddressesDocument).data?.cart

  const customerAddresses = filterNonNullableKeys(customer.data?.customer?.addresses, ['id'])

  const cartShipping = cart?.shipping_addresses?.[0]
  const cartShippingId =
    findCustomerAddressFromCartAddress(customerAddresses, cartShipping)?.id || null
  const defaultShippingId = customerAddresses.find((a) => a.default_shipping)?.id || undefined

  const cartBilling = cart?.billing_address
  const cartBillingId =
    findCustomerAddressFromCartAddress(customerAddresses, cartBilling)?.id || null
  const defaultBillingId = customerAddresses.find((a) => a.default_billing)?.id || undefined

  let Mutation = SetCustomerShippingBillingAddressOnCartDocument

  // The customer already has their billing address configured AND has a different shipping address than the billing address
  // we are only going to update the shipping address here.
  if (cartShippingId && cartBillingId && cartBillingId !== cartShippingId)
    Mutation = SetCustomerShippingAddressOnCartDocument

  // For a virtual cart this is the only mutation we can use.
  if (cart?.is_virtual) Mutation = SetCustomerBillingAddressOnCartDocument

  const form = useFormGqlMutationCart(Mutation, {
    experimental_useV2: true,
    defaultValues: {
      billingAddress: { customer_address_id: cartBillingId },
      shippingAddress: { customer_address_id: cartShippingId },
    },
    onBeforeSubmit: (vars) => (vars.shippingAddress.customer_address_id === -1 ? false : vars),
  })

  const { handleSubmit, error, control, setValue, watch } = form

  // If customer selects 'new address' then we do not have to submit anything so we provide an empty submit function.
  const formShippingId = watch('shippingAddress.customer_address_id')

  useMemo(() => {
    if (!formShippingId && !cartShippingId && defaultShippingId) {
      // console.log('shippingAddress.customer_address_id', defaultShippingId)
      setValue('shippingAddress.customer_address_id', defaultShippingId, { shouldValidate: true })
    }

    if (!cartBillingId && defaultBillingId) {
      // console.log('billingAddress.customer_address_id', defaultBillingId)
      setValue('billingAddress.customer_address_id', defaultBillingId, { shouldValidate: true })
    }

    if (!cartBillingId && !defaultBillingId && defaultShippingId) {
      // console.log('billingAddress.customer_address_id', defaultShippingId)
      setValue('billingAddress.customer_address_id', defaultShippingId, { shouldValidate: true })
    }
  }, [cartBillingId, cartShippingId, defaultBillingId, defaultShippingId, formShippingId, setValue])

  const submit = handleSubmit(() => {})

  // We want to persist the form because we can't send the 'new address' state to the server, but we do want to keep this selection.
  useFormPersist({ form, name: 'CustomerAddressForm' })
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  if (customer.loading || customerAddresses.length === 0) return <>{children}</>

  return (
    <>
      <FormAutoSubmit control={form.control} submit={submit} exact wait={0} />
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        <ActionCardListForm
          control={control}
          name='shippingAddress.customer_address_id'
          errorMessage={i18n._(/* i18n */ 'Please select a shipping address')}
          collapse
          size='large'
          color='secondary'
          items={[
            ...customerAddresses.map((address) => ({ ...address, value: address.id })),
            { value: -1 },
          ]}
          render={CustomerAddressActionCard}
        />
        <ApolloCartErrorAlert error={error} />
      </Box>
      {formShippingId === -1 && children}
    </>
  )
}
