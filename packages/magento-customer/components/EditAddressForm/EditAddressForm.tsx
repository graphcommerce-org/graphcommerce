import { ApolloErrorSnackbar, TelephoneElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import type { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import { AddressFields } from '../AddressFields/AddressFields'
import { CompanyFields } from '../CompanyFields'
import { NameFields } from '../NameFields/NameFields'
import { UpdateCustomerAddressDocument } from './UpdateCustomerAddress.gql'

type EditAddressFormProps = {
  address?: AccountAddressFragment
  sx?: SxProps<Theme>
}

export function EditAddressForm(props: EditAddressFormProps) {
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const { address, sx } = props

  const router = useRouter()

  const form = useFormGqlMutation(
    UpdateCustomerAddressDocument,
    {
      defaultValues: {
        id: address?.id ?? undefined,
        firstname: address?.firstname,
        lastname: address?.lastname,
        street: address?.street?.[0] ?? undefined,
        postcode: address?.postcode,
        city: address?.city,
        countryCode: address?.country_code,
        telephone: address?.telephone,
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
        <CompanyFields form={form} />
        <NameFields form={form} prefix />
        <AddressFields form={form} name={{ regionId: 'region.region_id' }} />
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

      <ApolloErrorSnackbar error={error} />
    </>
  )
}
