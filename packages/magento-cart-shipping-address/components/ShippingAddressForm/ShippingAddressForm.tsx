import {
  CheckboxElement,
  FormAutoSubmit,
  FormPersist,
  TelephoneElement,
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
import { CartAddressFragment } from '@graphcommerce/magento-cart/components/CartAddress/CartAddress.gql'
import {
  AddressFields,
  CustomerDocument,
  NameFields,
  useCustomerQuery,
  CompanyFields,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, StoreConfigDocument } from '@graphcommerce/magento-store'
import { Form, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { SxProps, Theme } from '@mui/material'
import React from 'react'
import { isCartAddressACustomerAddress } from '../../utils/findCustomerAddressFromCartAddress'
import { isSameAddress } from '../../utils/isSameAddress'
import { GetAddressesDocument } from './GetAddresses.gql'
import { SetBillingAddressDocument } from './SetBillingAddress.gql'
import { SetShippingAddressDocument } from './SetShippingAddress.gql'
import { SetShippingBillingAddressDocument } from './SetShippingBillingAddress.gql'

export type ShippingAddressFormProps = Pick<UseFormComposeOptions, 'step'> & {
  /**
   * @deprecated This was used to make sure the form wasn't filled with a customer's address. However this also broke the checkout when navigating back from the checkout. This is now automatically handled.
   */
  ignoreCache?: boolean
  sx?: SxProps<Theme>
}

export const ShippingAddressForm = React.memo<ShippingAddressFormProps>((props) => {
  const { step, sx } = props
  const { data: cartQuery } = useCartQuery(GetAddressesDocument)
  const { data: config } = useQuery(StoreConfigDocument)
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const { data: customerQuery } = useCustomerQuery(CustomerDocument)

  const shopCountry = config?.storeConfig?.locale?.split('_')?.[1].toUpperCase()

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const billingAddress = cartQuery?.cart?.billing_address
  let currentAddress: CartAddressFragment | undefined | null = shippingAddress

  let Mutation = SetShippingBillingAddressDocument

  // Customer has a different shipping address than the billing address we only need to update the shipping address here.
  if (!isSameAddress(shippingAddress, billingAddress)) Mutation = SetShippingAddressDocument

  // TODO: This is a hard dependency on Magento's MSI and should be removed, how can we get to this value?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore The pickup_location_code is optional
  const isAddressAPickupLocation = Boolean(shippingAddress?.pickup_location_code)
  const isShippingMethodPickup =
    shippingAddress?.selected_shipping_method?.carrier_code === 'instore'

  // If the address is a pick up location, we never want to show it in this form.
  // TODO: Do we want to restore the previous shipping address here, how would we go about that?
  if (isAddressAPickupLocation) currentAddress = billingAddress

  // The customer is choosing to pick up the order from a store, therefor we are never allowed to update the shipping address.
  // TODO: instead of submitting the billing address here, we can also choose to make the form readOnly and show a message to the customer.
  if (isAddressAPickupLocation && isShippingMethodPickup) Mutation = SetBillingAddressDocument

  // TODO: For a virtual cart this form should is only interested in setting the billing address.
  const isVirtual = cartQuery?.cart?.is_virtual ?? false
  if (isVirtual) {
    currentAddress = billingAddress
    Mutation = SetBillingAddressDocument
  }

  const form = useFormGqlMutationCart(Mutation, {
    defaultValues: isCartAddressACustomerAddress(customerQuery?.customer?.addresses, currentAddress)
      ? { saveInAddressBook: true, isCompany: false }
      : {
          // todo(paales): change to something more sustainable
          firstname: currentAddress?.firstname ?? customerQuery?.customer?.firstname ?? '',
          lastname: currentAddress?.lastname ?? customerQuery?.customer?.lastname ?? '',
          telephone:
            currentAddress?.telephone !== '000 - 000 0000' ? currentAddress?.telephone : '',
          city: currentAddress?.city ?? '',
          company: currentAddress?.company ?? '',
          vatId: currentAddress?.vat_id ?? '',
          postcode: currentAddress?.postcode ?? '',
          street: currentAddress?.street?.[0] ?? '',
          houseNumber: currentAddress?.street?.[1] ?? '',
          addition: currentAddress?.street?.[2] ?? '',
          regionId: currentAddress?.region?.region_id ?? null,
          countryCode: currentAddress?.country.code ?? shopCountry, // todo: replace by the default shipping country of the store + geoip,
          saveInAddressBook: true,
          isCompany: Boolean(currentAddress?.company || currentAddress?.vat_id),
          customerNote: '',
        },
    mode: 'onChange',
    onBeforeSubmit: (variables) => {
      const regionId = countries
        ?.find((country) => country?.two_letter_abbreviation === variables.countryCode)
        ?.available_regions?.find((region) => region?.id === variables.regionId)?.id

      if (!variables.isCompany) {
        variables.company = ''
        variables.vatId = ''
      }

      return {
        ...variables,
        telephone: variables.telephone || '000 - 000 0000',
        region: regionId ? variables.region : '',
        regionId,
        addition: variables.addition ?? '',
      }
    },
  })
  const { handleSubmit, required, error } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'ShippingAddressForm' })

  return (
    <Form onSubmit={submit} noValidate sx={sx}>
      <FormAutoSubmit
        submit={submit}
        control={form.control}
        name={['postcode', 'countryCode', 'regionId']}
      />

      <CompanyFields form={form} />
      <NameFields form={form} />
      <AddressFields form={form} />

      <FormRow>
        <TelephoneElement
          control={form.control}
          name='telephone'
          variant='outlined'
          required={required.telephone}
          showValid
        />
      </FormRow>
      {customerQuery?.customer && (
        <CheckboxElement
          control={form.control}
          name='saveInAddressBook'
          label={<Trans>Save in address book</Trans>}
        />
      )}

      {!isVirtual && import.meta.graphCommerce.customerAddressNoteEnable && (
        <FormRow>
          <TextFieldElement
            control={form.control}
            name='customerNote'
            label={<Trans>Shipping Note</Trans>}
            multiline
            minRows={3}
            required={required.customerNote}
          />
        </FormRow>
      )}

      <ApolloCartErrorAlert error={error} />
      <FormPersist form={form} name='ShippingAddressForm' />
    </Form>
  )
})
