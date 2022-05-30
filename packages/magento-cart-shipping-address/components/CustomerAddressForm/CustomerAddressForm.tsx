import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { iconHome, IconSvg, Form, Button } from '@graphcommerce/next-ui'
import { ActionCardListForm } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import {
  useFormPersist,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, FormControl } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { isSameAddress } from '../../utils/isSameAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import { SetCustomerShippingBillingAddressOnCartDocument } from './SetCustomerShippingBillingAddressOnCart.gql'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'> & { children?: React.ReactNode }

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const customerAddresses = useQuery(CustomerDocument)
  const addresses = customerAddresses.data?.customer?.addresses
  const { step, children } = props
  const { push } = useRouter()

  const { data: cartQuery } = useCartQuery(GetAddressesDocument)

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const billingAddress = cartQuery?.cart?.billing_address

  const Mutation = isSameAddress(shippingAddress, billingAddress)
    ? SetCustomerShippingBillingAddressOnCartDocument
    : SetCustomerShippingAddressOnCartDocument

  // if (cartQuery?.cart?.is_virtual) {
  //   Mutation = SetCustomerBillingAddressOnCartDocument
  // }

  const form = useFormGqlMutationCart(Mutation, { mode: 'onChange' })
  const { handleSubmit, error, control, watch } = form

  // If customer selects 'new address' then we do not have to submit anything so we provide an empty submit function.
  const customerAddressId = watch('customerAddressId')

  const submit = customerAddressId === -1 ? async () => {} : handleSubmit(() => {})

  useFormPersist({ form, name: 'CustomerAddressForm' })
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  if (customerAddresses.loading) return null

  return (
    <>
      <Form onSubmit={submit} noValidate>
        <FormControl>
          <ActionCardListForm
            control={control}
            name='customerAddressId'
            defaultValue={!customerAddressId && addresses?.length === 0 ? '-1' : null}
            items={[
              ...(addresses ?? []).map((address) => ({
                value: Number(address?.id),
                title: `${address?.firstname} ${address?.lastname}`,
                image: <IconSvg src={iconHome} size='large' />,
                details: (
                  <Box>
                    {address?.street?.join(' ')}, {address?.postcode}, {address?.city},{' '}
                    {address?.country_code}
                  </Box>
                ),
                secondaryAction: (
                  <Button
                    disableRipple
                    color='secondary'
                    variant='text'
                    onClick={(e) => {
                      e.stopPropagation()
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      push(`/checkout/customer/addresses/edit?addressId=${address?.id}`)
                    }}
                  >
                    <Trans id='Edit address' />
                  </Button>
                ),
              })),
              {
                value: '-1',
                title: <Trans id='New address' />,
                details: <Trans id='Add new address' />,
                image: <IconSvg src={iconHome} size='large' />,
                reset: null,
              },
            ]}
          />
        </FormControl>
        <ApolloCartErrorAlert error={error} />
      </Form>

      {String(customerAddressId) === '-1' && children}
    </>
  )
}
