// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloErrorSnackbar, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  InputCheckmark,
} from '@graphcommerce/next-ui'
import { phonePattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { SxProps, TextField, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import { AddressFields } from '../AddressFields/AddressFields'
import { NameFields } from '../NameFields/NameFields'
import { UpdateCustomerAddressDocument } from './UpdateCustomerAddress.gql'

type EditAddressFormProps = {
  address?: AccountAddressFragment
  sx?: SxProps<Theme>
  /**
   * @deprecated not used, can be safely removed.
   */
  onCompleteRoute?: string
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
        <NameFields form={form} prefix />
        <AddressFields form={form} name={{ regionId: 'region.region_id' }} />

        <FormRow>
          <TextFieldElement
            control={control}
            name='telephone'
            variant='outlined'
            type='text'
            error={!!formState.errors.telephone}
            required={required.telephone}
            label={<Trans id='Telephone' />}
            rules={{
              required: required.telephone,
              pattern: { value: phonePattern, message: i18n._(/* i18n */ 'Invalid phone number') },
            }}
            helperText={formState.isSubmitted && formState.errors.telephone?.message}
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

      <ApolloErrorSnackbar error={error} />
    </>
  )
}
