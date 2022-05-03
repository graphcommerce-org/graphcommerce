import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { iconHome, IconSvg, ActionCardList, ActionCard, Form } from '@graphcommerce/next-ui'
import {
  useFormPersist,
  useFormCompose,
  UseFormComposeOptions,
  Controller,
} from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, FormControl, Link } from '@mui/material'
import { isSameAddress } from '../../utils/isSameAddress'
import { GetAddressesDocument } from '../ShippingAddressForm/GetAddresses.gql'
import { SetCustomerBillingAddressOnCartDocument } from './SetCustomerBillingAddressOnCart.gql'
import { SetCustomerShippingAddressOnCartDocument } from './SetCustomerShippingAddressOnCart.gql'
import { SetCustomerShippingBillingAddressOnCartDocument } from './SetCustomerShippingBillingAddressOnCart.gql'

type CustomerAddressListProps = Pick<UseFormComposeOptions, 'step'>

export function CustomerAddressForm(props: CustomerAddressListProps) {
  const customerAddresses = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })
  const addresses = customerAddresses.data?.customer?.addresses
  const { step } = props

  const { data: cartQuery } = useCartQuery(GetAddressesDocument)

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const billingAddress = cartQuery?.cart?.billing_address

  const Mutation = isSameAddress(shippingAddress, billingAddress)
    ? SetCustomerShippingBillingAddressOnCartDocument
    : SetCustomerShippingAddressOnCartDocument

  // if (cartQuery?.cart?.is_virtual) {
  //   Mutation = SetCustomerBillingAddressOnCartDocument
  // }

  const form = useFormGqlMutationCart(Mutation, {
    mode: 'onChange',
  })
  const { handleSubmit, error, control } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: 'CustomerAddressForm' })
  useFormCompose({ form, step, submit, key: 'CustomerAddressForm' })

  if (customerAddresses.loading || !addresses || addresses.length === 0) return null

  return (
    <Form onSubmit={submit} noValidate>
      <FormControl>
        <Controller
          control={control}
          name='customerAddressId'
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <ActionCardList
              required
              value={String(value)}
              onChange={(event, incomming) => {
                onChange(Number(incomming))
              }}
            >
              {addresses.map((address) => (
                <ActionCard
                  value={String(address?.id)}
                  key={address?.id}
                  action={
                    <Box>
                      <Link href='#' underline='none' color='secondary'>
                        <Trans>Select</Trans>
                      </Link>
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
                  secondaryAction={
                    <Link underline='none' color='secondary'>
                      <Trans>Edit address</Trans>
                    </Link>
                  }
                  selected={value === address?.id}
                  hidden={!!value && value !== address?.id}
                  reset={
                    <Link
                      underline='none'
                      color='secondary'
                      onClick={() => {
                        onChange(undefined)
                      }}
                    >
                      <Trans>Change</Trans>
                    </Link>
                  }
                />
              ))}
            </ActionCardList>
          )}
        />
      </FormControl>
      <ApolloCartErrorAlert error={error} />
    </Form>
  )
}
