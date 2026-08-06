import { ApolloErrorSnackbar, TelephoneElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument, useAttributesForm } from '@graphcommerce/magento-store'
import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useBillingAddressPermission } from '../../hooks'
import type { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import { AddressFields } from '../AddressFields/AddressFields'
import { CompanyFields } from '../CompanyFields'
import { NameFields } from '../NameFields/NameFields'
import type { UpdateCustomerAddressMutationVariables } from './UpdateCustomerAddress.gql'
import { UpdateCustomerAddressDocument } from './UpdateCustomerAddress.gql'

export type EditAddressFormProps = {
  address?: AccountAddressFragment
  sx?: SxProps<Theme>
}

export function EditAddressForm(props: EditAddressFormProps) {
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const { address, sx } = props

  const router = useRouter()
  const billingAddressReadonly = useBillingAddressPermission() === 'READONLY'

  // Magento's address attribute metadata tells us whether a telephone is required, as configured by
  // `customer/address/telephone_show`.
  const addressAttributes = useAttributesForm({ formCode: 'customer_address_edit' })
  const telephoneRequired = addressAttributes.find((a) => a.code === 'telephone')?.is_required

  const form = useFormGqlMutation(
    UpdateCustomerAddressDocument,
    {
      disabled: billingAddressReadonly && (address?.default_billing ?? false),
      defaultValues: {
        id: address?.id ?? undefined,
        firstname: address?.firstname,
        lastname: address?.lastname,
        street: address?.street?.[0] ?? undefined,
        postcode: address?.postcode,
        city: address?.city,
        countryCode: address?.country_code,
        telephone: address?.telephone !== '000 - 000 0000' ? address?.telephone : '',
        houseNumber: address?.street?.[1] ?? '',
        addition: address?.street?.[2] ?? '',
        region: address?.region,
        company: address?.company ?? '',
        vatId: address?.vat_id ?? '',
        isCompany: Boolean(address?.company || address?.vat_id),
      },
      onBeforeSubmit: (formData) => {
        const region = countries
          ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
          ?.available_regions?.find((r) => r?.id === formData.region?.region_id)
        const regionData = {
          region:
            (region && {
              region: region.name,
              region_code: region.code,
              region_id: region.id,
            }) ??
            null,
        }
        if (!formData.isCompany) {
          formData.company = ''
          formData.vatId = ''
        }

        return {
          ...formData,
          ...regionData,
        }
      },
      onComplete: ({ errors }) => {
        if (!errors) router.back()
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, required, error, control } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <>
      <Form onSubmit={submitHandler} noValidate sx={sx}>
        <CompanyFields<UpdateCustomerAddressMutationVariables> form={form} />
        <NameFields form={form} prefix />
        <AddressFields<UpdateCustomerAddressMutationVariables>
          form={form}
          name={{ regionId: 'region.region_id' }}
        />
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
        {billingAddressReadonly && address?.default_billing ? (
          <Trans>
            You can not change this address as it is your billing address. Not correct? Please
            contact our support to update this.
          </Trans>
        ) : (
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
        )}
      </Form>
      <ApolloErrorSnackbar error={error} />
    </>
  )
}
