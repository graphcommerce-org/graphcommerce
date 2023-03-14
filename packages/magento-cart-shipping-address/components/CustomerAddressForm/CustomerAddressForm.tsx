import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { ActionCardListForm } from '@graphcommerce/next-ui'
import {
  useFormPersist,
  useFormCompose,
  UseFormComposeOptions,
  useFormAutoSubmit,
} from '@graphcommerce/react-hook-form'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { isSameAddress } from '../../utils/isSameAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { CustomerAddressActionCard } from './CustomerAddressActionCard'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import { SetCustomerShippingBillingAddressOnCartDocument } from './SetCustomerShippingBillingAddressOnCart.gql'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const { step, children, sx } = props

  const customerAddresses = useQuery(CustomerDocument)
  const addresses = customerAddresses.data?.customer?.addresses

  const { data: cartQuery } = useCartQuery(GetAddressesDocument)

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const billingAddress = cartQuery?.cart?.billing_address

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

  // if (cartQuery?.cart?.is_virtual) {
  //   Mutation = SetCustomerBillingAddressOnCartDocument
  // }

  const form = useFormGqlMutationCart(Mutation, {
    defaultValues: {
      customerAddressId: found?.id ?? undefined,
    },
    onBeforeSubmit: (vars) => {
      if (vars.customerAddressId === -1) return false
      return vars
    },
  })

  const { handleSubmit, error, control, watch, setValue } = form

  // If customer selects 'new address' then we do not have to submit anything so we provide an empty submit function.
  const customerAddressId = watch('customerAddressId')

  const submit = handleSubmit(() => {})

  // We want to persist the form because we can't send the 'new address' state to the server, but we do want to keep this selection.
  useFormPersist({ form, name: 'CustomerAddressForm' })
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  // We want to autosubmit the CustomerAddressFrom because the shipping methods depend on it.
  useFormAutoSubmit({ form, submit })

  // When there is no address set on the cart set before
  const defaultAddr =
    (!shippingAddress && addresses?.find((a) => a?.default_shipping)?.id) || undefined

  useEffect(() => {
    if (defaultAddr) setValue('customerAddressId', defaultAddr)
  }, [defaultAddr, setValue])

  if (customerAddresses.loading || !addresses || addresses.length === 0) return <>{children}</>

  return (
    <>
      <Box component='form' onSubmit={submit} noValidate sx={sx}>
        <ActionCardListForm
          control={control}
          name='customerAddressId'
          errorMessage='Please select a shipping address'
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
