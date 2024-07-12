import { TelephoneElement } from '@graphcommerce/ecommerce-ui'
import { useHistoryGo } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { SetBillingAddressDocument } from '@graphcommerce/magento-cart-shipping-address'
import {
  AddressFields,
  ApolloCustomerErrorAlert,
  CompanyFields,
  NameFields,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { Button, Form, FormActions, FormDivider, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { GetBillingAddressDocument } from './GetBillingAddress.gql'

export type EditBillingAddressFormProps = { sx?: SxProps<Theme> }

export function EditBillingAddressForm(props: EditBillingAddressFormProps) {
  const { sx } = props
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const address = useCartQuery(GetBillingAddressDocument)?.data?.cart?.billing_address

  const goToCheckout = useHistoryGo({ href: '/checkout/payment' })

  const form = useFormGqlMutationCart(SetBillingAddressDocument, {
    defaultValues: {
      firstname: address?.firstname,
      lastname: address?.lastname,
      postcode: address?.postcode ?? '',
      city: address?.city,
      countryCode: address?.country.code,
      street: address?.street?.[0] ?? '',
      telephone: address?.telephone,
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
        telephone: variables.telephone || '000 - 000 0000',
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
        <CompanyFields form={form} />
        <NameFields form={form} prefix />
        <AddressFields form={form} />

        <FormRow>
          <TelephoneElement
            variant='outlined'
            required={required.telephone}
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
            <Trans id='Save changes' />
          </Button>
        </FormActions>
      </Form>

      <ApolloCustomerErrorAlert error={error} />
    </>
  )
}
