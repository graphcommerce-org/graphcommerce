import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { iconHome, IconSvg, ActionCardList, ActionCard, Form, Button } from '@graphcommerce/next-ui'
import {
  useFormPersist,
  useFormCompose,
  UseFormComposeOptions,
  Controller,
} from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, FormControl, Link, NoSsr } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { isSameAddress } from '../../utils/isSameAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { SetCustomerBillingAddressOnCartDocument } from './SetCustomerBillingAddressOnCart.gql'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import { SetCustomerShippingBillingAddressOnCartDocument } from './SetCustomerShippingBillingAddressOnCart.gql'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'> & { children?: React.ReactNode }

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const customerAddresses = useQuery(CustomerDocument)
  const addresses = customerAddresses.data?.customer?.addresses
  const { step, children } = props
  const router = useRouter()

  const { data: cartQuery } = useCartQuery(GetAddressesDocument)

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const billingAddress = cartQuery?.cart?.billing_address
  console.clear()
  console.log('shippingAddress', shippingAddress)

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

  console.log('found', found)

  const Mutation = isSameAddress(shippingAddress, billingAddress)
    ? SetCustomerShippingBillingAddressOnCartDocument
    : SetCustomerShippingAddressOnCartDocument

  // if (cartQuery?.cart?.is_virtual) {
  //   Mutation = SetCustomerBillingAddressOnCartDocument
  // }

  const form = useFormGqlMutationCart(Mutation, {
    // defaultValues: { customerAddressId: defaultCustomerAddressId },
    mode: 'onChange',
  })
  const { handleSubmit, error, control, watch } = form

  // If customer selects 'new address' then we do not have to submit anything so we provide an empty submit function.
  const customerAddressId = watch('customerAddressId')

  const submit = customerAddressId === -1 ? async () => {} : handleSubmit(() => {})

  // useFormPersist({ form, name: 'CustomerAddressForm' })
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  if (customerAddresses.loading || !addresses || addresses.length === 0) return null

  return (
    <>
      {' '}
      <Form onSubmit={submit} noValidate>
        <FormControl>
          <Controller
            control={control}
            defaultValue={0}
            name='customerAddressId'
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState, formState }) => (
              <NoSsr>
                <ActionCardList
                  required
                  value={String(value)}
                  onChange={(event, incomming) => {
                    onChange(Number(incomming))
                  }}
                  error={formState.isSubmitted && !!fieldState.error}
                >
                  {addresses.map((address) => (
                    <ActionCard
                      value={String(address?.id)}
                      key={address?.id}
                      action={
                        <Box>
                          <Button variant='text' color='secondary'>
                            <Trans>Select</Trans>
                          </Button>
                        </Box>
                      }
                      image={<IconSvg src={iconHome} size='large' />}
                      title={`${address?.firstname} ${address?.lastname}`}
                      details={
                        <Box>
                          {address?.street?.join(' ')}, {address?.postcode}, {address?.city},{' '}
                          {address?.country_code}
                        </Box>
                      }
                      onClick={onChange}
                      secondaryAction={
                        <Button
                          color='secondary'
                          variant='text'
                          onClick={(e) => {
                            e.stopPropagation()

                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            router.push(
                              `/checkout/customer/addresses/edit?addressId=${address?.id}`,
                            )
                          }}
                        >
                          <Trans>Edit address</Trans>
                        </Button>
                      }
                      selected={value === address?.id}
                      hidden={!!value && value !== address?.id}
                      reset={
                        <Link
                          underline='none'
                          color='secondary'
                          onClick={(e) => {
                            e.preventDefault()
                            onChange(null)
                          }}
                        >
                          <Trans>Change</Trans>
                        </Link>
                      }
                    />
                  ))}
                  <ActionCard
                    value='-1'
                    key='new-address'
                    title={<Trans>New address</Trans>}
                    selected={value === -1}
                    hidden={!!value && value !== -1}
                    details={<Trans>Add new address</Trans>}
                    image={<IconSvg src={iconHome} size='large' />}
                    action={
                      <Box>
                        <Link href='#' underline='none' color='secondary'>
                          <Trans>Select</Trans>
                        </Link>
                      </Box>
                    }
                    reset={
                      <Link
                        href='#'
                        underline='none'
                        color='secondary'
                        onClick={(e) => {
                          e.preventDefault()
                          onChange(null)
                        }}
                      >
                        <Trans>Change</Trans>
                      </Link>
                    }
                  />
                </ActionCardList>
              </NoSsr>
            )}
          />
        </FormControl>
        <ApolloCartErrorAlert error={error} />
      </Form>
      {customerAddressId === -1 && children}
    </>
  )
}
