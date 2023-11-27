import { useHistoryGo } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { SetBillingAddressDocument } from '@graphcommerce/magento-cart-shipping-address/components/ShippingAddressForm/SetBillingAddress.gql'
import {
  AddressFields,
  ApolloCustomerErrorAlert,
  NameFields,
  TelephoneField,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { Button, Form, FormActions, FormDivider } from '@graphcommerce/next-ui'
import { FormProvider } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { GetBillingAddressDocument } from './GetBillingAddress.gql'

export type EditBillingAddressFormProps = { sx?: SxProps<Theme>; children?: React.ReactNode }

export function EditBillingAddressForm(props: EditBillingAddressFormProps) {
  const { sx, children } = props
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
      saveInAddressBook: true,
    },
    onBeforeSubmit: (variables) => {
      const regionId = countries
        ?.find((country) => country?.two_letter_abbreviation === variables.countryCode)
        ?.available_regions?.find((region) => region?.id === variables.regionId)?.id

      return {
        ...variables,
        telephone: variables.telephone || '000 - 000 0000',
        regionId,
      }
    },
    onComplete: ({ errors }) => {
      if (!errors) goToCheckout()
    },
  })

  const { handleSubmit, formState } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler} noValidate sx={sx}>
        {children ?? (
          <>
            <NameFields />
            <AddressFields />
            <TelephoneField />
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
            <ApolloCustomerErrorAlert />
          </>
        )}
      </Form>
    </FormProvider>
  )
}
