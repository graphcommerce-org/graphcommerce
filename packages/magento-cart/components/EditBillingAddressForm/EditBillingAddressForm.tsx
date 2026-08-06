import { TelephoneElement } from '@graphcommerce/ecommerce-ui'
import { useHistoryGo } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import {
  SetBillingAddressDocument,
  type SetBillingAddressMutationVariables,
} from '@graphcommerce/magento-cart-shipping-address'
import {
  AddressFields,
  ApolloCustomerErrorAlert,
  CompanyFields,
  NameFields,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, useAttributesForm } from '@graphcommerce/magento-store'
import { Button, Form, FormActions, FormDivider, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { GetBillingAddressDocument } from '../../graphql'
import { useCartQuery, useFormGqlMutationCart } from '../../hooks'

/**
 * GraphCommerce used to submit this placeholder whenever the telephone field was left empty: it
 * couldn't tell whether the shop required a telephone, while `CartAddressInput.telephone` is a
 * non-nullable `String!`. Addresses saved back then still carry it, so it is cleared from the form
 * instead of presented to the customer as if it were a real number.
 */
const legacyPlaceholderTelephone = '000 - 000 0000'

export type EditBillingAddressFormProps = { sx?: SxProps<Theme> }

export function EditBillingAddressForm(props: EditBillingAddressFormProps) {
  const { sx } = props
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const address = useCartQuery(GetBillingAddressDocument)?.data?.cart?.billing_address

  const goToCheckout = useHistoryGo({ href: '/checkout/payment' })

  // Magento's address attribute metadata tells us whether a telephone is required, as configured by
  // `customer/address/telephone_show`.
  const addressAttributes = useAttributesForm({ formCode: 'customer_address_edit' })
  const telephoneRequired = addressAttributes.find((a) => a.code === 'telephone')?.is_required

  const form = useFormGqlMutationCart(SetBillingAddressDocument, {
    defaultValues: {
      firstname: address?.firstname,
      lastname: address?.lastname,
      postcode: address?.postcode ?? '',
      city: address?.city,
      countryCode: address?.country.code,
      street: address?.street?.[0] ?? '',
      telephone: address?.telephone !== legacyPlaceholderTelephone ? address?.telephone : '',
      houseNumber: address?.street?.[1] ?? '',
      addition: address?.street?.[2] ?? '',
      company: address?.company ?? '',
      vatId: address?.vat_id ?? '',
      isCompany: Boolean(address?.company || !!address?.vat_id),
      saveInAddressBook: true,
    },
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
        // See ShippingAddressForm: `CartAddressInput.telephone` is non-nullable, so send an empty
        // string rather than a fake number and let Magento validate it.
        telephone: variables.telephone || '',
        regionId,
      }
    },
    onComplete: async ({ errors }) => {
      if (!errors) await goToCheckout()
    },
  })

  const { handleSubmit, formState, required, error, control } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <>
      <Form onSubmit={submitHandler} noValidate sx={sx}>
        <CompanyFields<SetBillingAddressMutationVariables> form={form} />
        <NameFields form={form} prefix />
        <AddressFields<SetBillingAddressMutationVariables> form={form} />
        <FormRow>
          <TelephoneElement
            variant='outlined'
            required={required.telephone || telephoneRequired === true}
            control={control}
            name='telephone'
            disabled={formState.isSubmitting}
            showValid
          />
        </FormRow>
        <FormDivider />
        <FormActions sx={{ paddingBottom: 0 }}>
          <Button
            type='submit'
            variant='pill'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            <Trans>Save changes</Trans>
          </Button>
        </FormActions>
      </Form>
      <ApolloCustomerErrorAlert error={error} />
    </>
  )
}
