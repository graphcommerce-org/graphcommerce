import {
  FormAutoSubmit,
  FormPersist,
  TextFieldElement,
  UseFormComposeOptions,
  useFormCompose,
} from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { ActionCardListForm, FormRow, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { Box, SxProps, Theme } from '@mui/material'
import React, { useEffect } from 'react'
import { findCustomerAddressFromCartAddress } from '../../utils/findCustomerAddressFromCartAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { CustomerAddressActionCard } from './CustomerAddressActionCard'
import { SetCustomerBillingAddressOnCartDocument } from './SetCustomerBillingAddressOnCart.gql'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import {
  SetCustomerShippingBillingAddressOnCartDocument,
  SetCustomerShippingBillingAddressOnCartMutation,
  SetCustomerShippingBillingAddressOnCartMutationVariables,
} from './SetCustomerShippingBillingAddressOnCart.gql'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const { step, children, sx } = props

  const customer = useQuery(CustomerDocument)
  const cartQuery = useCartQuery(GetAddressesDocument)
  const cart = cartQuery.data?.cart
  const isVirtual = cart?.is_virtual ?? false

  const customerAddresses = filterNonNullableKeys(customer.data?.customer?.addresses, ['id'])

  const cartShipping = cart?.shipping_addresses?.[0]
  const cartShippingId =
    findCustomerAddressFromCartAddress(customerAddresses, cartShipping)?.id || null
  const defaultShippingId = customerAddresses.find((a) => a.default_shipping)?.id || undefined

  const cartBilling = cart?.billing_address
  const cartBillingId =
    findCustomerAddressFromCartAddress(customerAddresses, cartBilling)?.id || null
  const defaultBillingId = customerAddresses.find((a) => a.default_billing)?.id || undefined

  let mode: 'both' | 'shipping' | 'billing' = 'both'
  let Mutation = SetCustomerShippingBillingAddressOnCartDocument
  let cartAddressId = cartShippingId

  // The customer already has their billing/shipping address configured AND has a different shipping address than the billing address
  // we are only going to update the shipping address here.
  if (cartBillingId && cartShippingId && cartBillingId !== cartShippingId) {
    Mutation = SetCustomerShippingAddressOnCartDocument
    mode = 'shipping'
  }

  // Billing/Shipping address is different in account, but billing address gets set by default by Magento, so we only need to handle the shipping address.
  if (cartBillingId && !cartShippingId && defaultBillingId !== defaultShippingId) {
    Mutation = SetCustomerShippingAddressOnCartDocument
    mode = 'shipping'
  }

  // For a virtual cart this is the only mutation we can use.
  if (cart?.is_virtual) {
    Mutation = SetCustomerBillingAddressOnCartDocument
    cartAddressId = cartBillingId
    mode = 'billing'
  }

  const form = useFormGqlMutationCart<
    SetCustomerShippingBillingAddressOnCartMutation,
    SetCustomerShippingBillingAddressOnCartMutationVariables & {
      customer_address_id: number | null
    }
  >(Mutation, {
    experimental_useV2: true,
    defaultValues: { customer_address_id: cartAddressId },
    onBeforeSubmit: (vars) => {
      const { customer_address_id } = vars
      if (customer_address_id === -1) return false

      switch (mode) {
        case 'both':
          return {
            ...vars,
            billingAddress: { same_as_shipping: true },
            shippingAddress: {
              customer_address_id,
              customer_notes: vars.shippingAddress.customer_notes ?? '',
            },
          }
        case 'shipping':
          return {
            ...vars,
            shippingAddress: {
              customer_address_id,
              customer_notes: vars.shippingAddress.customer_notes ?? '',
            },
          }
        case 'billing':
        default:
          return { ...vars, billingAddress: { customer_address_id } }
      }
    },
  })

  const { handleSubmit, error, control, setValue, watch } = form
  const formAddressId = watch('customer_address_id')

  useEffect(() => {
    if (mode === 'both' || mode === 'shipping') {
      if (!cartAddressId && !cartShipping && defaultShippingId) {
        setValue('customer_address_id', defaultShippingId, { shouldValidate: true })
      }
    }
    if (mode === 'billing') {
      if (!cartAddressId && !cartBilling && defaultBillingId) {
        setValue('customer_address_id', defaultBillingId, { shouldValidate: true })
      }
    }
  }, [
    cartAddressId,
    cartBilling,
    cartShipping,
    defaultBillingId,
    defaultShippingId,
    mode,
    setValue,
  ])

  const submit = handleSubmit(() => {})

  // We want to persist the form because we can't send the 'new address' state to the server, but we do want to keep this selection.
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  if (customer.loading || customerAddresses.length === 0) return <>{children}</>

  return (
    <>
      <FormAutoSubmit control={form.control} submit={submit} wait={0} />
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        <ActionCardListForm
          control={control}
          name='customer_address_id'
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
        {!isVirtual &&
          formAddressId !== -1 &&
          import.meta.graphCommerce.customerAddressNoteEnable && (
            <FormRow>
              <TextFieldElement
                control={form.control}
                name='shippingAddress.customer_notes'
                label={<Trans>Shipping Note</Trans>}
                multiline
                minRows={3}
              />
            </FormRow>
          )}
        <ApolloCartErrorAlert error={error} />
      </Box>
      {formAddressId === -1 && children}

      <FormPersist form={form} name='CustomerAddressForm' />
    </>
  )
}
