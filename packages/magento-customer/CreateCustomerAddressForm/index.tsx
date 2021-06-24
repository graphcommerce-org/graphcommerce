import { TextField } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormDivider from '@reachdigital/next-ui/Form/FormDivider'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import { phonePattern, useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import AddressFields from '../AddressFields'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import NameFields from '../NameFields'
import { CreateCustomerAddressDocument } from './CreateCustomerAddress.gql'

type CreateCustomerAddressFormProps = CountryRegionsQuery

export default function CreateCustomerAddressForm(props: CreateCustomerAddressFormProps) {
  const { countries } = props
  const router = useRouter()

  const form = useFormGqlMutation(
    CreateCustomerAddressDocument,
    {
      onBeforeSubmit: (formData) => {
        const region = countries
          ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
          ?.available_regions?.find((r) => r?.id === formData.region)

        return {
          ...formData,
          region:
            (region && {
              region: region.name,
              region_code: region.code,
              region_id: region.id,
            }) ??
            {},
        }
      },
      onComplete: (e) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/account/addresses/edit?addressId=${e.data?.createCustomerAddress?.id}`)
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, required, error, muiRegister, valid } = form
  const submitHandler = handleSubmit((_, e) => {
    if (!formState.errors) e?.target.reset()
  })

  return (
    <>
      <Form onSubmit={submitHandler} noValidate>
        <NameFields form={form} prefix />
        <AddressFields form={form} countries={countries} />

        <FormRow>
          <TextField
            variant='outlined'
            type='text'
            error={!!formState.errors.telephone}
            required={required.telephone}
            label='Telephone'
            {...muiRegister('telephone', {
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && formState.errors.telephone?.message}
            disabled={formState.isSubmitting}
            InputProps={{ endAdornment: <InputCheckmark show={valid.telephone} /> }}
          />
        </FormRow>

        <FormDivider />

        <FormActions>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            Save changes
          </Button>
        </FormActions>
      </Form>

      <ApolloCustomerErrorAlert error={error} />
    </>
  )
}
