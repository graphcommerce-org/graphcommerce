import {
  useFormPersist,
  useFormCompose,
  UseFormComposeOptions,
  useFormAutoSubmit,
} from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { ActionCardListForm } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { isSameAddress } from '../../utils/isSameAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { CustomerAddressActionCard } from './CustomerAddressActionCard'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import { SetCustomerShippingBillingAddressOnCartDocument } from './SetCustomerShippingBillingAddressOnCart.gql'
import { i18n } from '@lingui/core'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const { step, children, sx } = props

  const customerAddresses = useQuery(CustomerDocument)
  const addresses = customerAddresses.data?.customer?.addresses

  const { data: cartQuery } = useCartQuery(GetAddressesDocument)

  const defaultBillingAddress = customerAddresses.data?.customer?.addresses?.find(
    (a) => a?.default_billing,
  )

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const billingAddress = defaultBillingAddress || cartQuery?.cart?.billing_address

  const found = customerAddresses.data?.customer?.addresses?.find(
    (customerAddr) =>
      [
        customerAddr?.firstname === shippingAddress?.firstname,
        customerAddr?.lastname === shippingAddress?.lastname,
        customerAddr?.city === shippingAddress?.city,
        customerAddr?.postcode === shippingAddress?.postcode,
        customerAddr?.street?.[0] === shippingAddress?.street[0],
        customerAddr?.street?.[1] === shippingAddress?.street[1],
        customerAddr?.street?.[2] === shippingAddress?.street[2],
        customerAddr?.country_code === shippingAddress?.country.code,
        customerAddr?.region?.region_code === shippingAddress?.region?.code,
      ].filter((v) => !v).length === 0,
  )

  const Mutation = isSameAddress(shippingAddress, billingAddress)
    ? SetCustomerShippingBillingAddressOnCartDocument
    : SetCustomerShippingAddressOnCartDocument

  const defaultAddrId =
    (!shippingAddress && addresses?.find((a) => a?.default_shipping)?.id) || undefined

  // if (cartQuery?.cart?.is_virtual) {
  //   Mutation = SetCustomerBillingAddressOnCartDocument
  // }

  const form = useFormGqlMutationCart(Mutation, {
    defaultValues: {
      customerAddressId: found?.id ?? defaultAddrId,
    },
    onBeforeSubmit: (vars) => {
      if (vars.customerAddressId === -1) return false
      return vars
    },
  })

  const { handleSubmit, error, control, watch } = form

  // If customer selects 'new address' then we do not have to submit anything so we provide an empty submit function.
  const customerAddressId = watch('customerAddressId')

  const submit = handleSubmit(() => {})

  // We want to persist the form because we can't send the 'new address' state to the server, but we do want to keep this selection.
  useFormPersist({ form, name: 'CustomerAddressForm' })
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  // We want to autosubmit the CustomerAddressFrom because the shipping methods depend on it.
  const forceInitialSubmit = found?.id === undefined && defaultAddrId !== undefined
  useFormAutoSubmit({ form, submit, forceInitialSubmit })

  if (customerAddresses.loading || !addresses || addresses.length === 0) return <>{children}</>

  return (
    <>
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        <ActionCardListForm
          control={control}
          name='customerAddressId'
          errorMessage={i18n._(/* i18n */ 'Please select a shipping address')}
          collapse
          size='large'
          color='secondary'
          items={[
            ...(addresses ?? []).filter(Boolean).map((address) => ({
              ...address,
              value: Number(address?.id),
            })),
            { value: -1 },
          ]}
          render={CustomerAddressActionCard}
        />
        <ApolloCartErrorAlert error={error} />
      </Box>
      {customerAddressId === -1 && children}
    </>
  )
}
