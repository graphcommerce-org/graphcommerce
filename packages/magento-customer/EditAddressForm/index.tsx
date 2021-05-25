import { makeStyles, TextField } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormDivider from '@reachdigital/next-ui/Form/FormDivider'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { phonePattern, useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import AddressFields from '../AddressFields'
import NameFields from '../NameFields'
import { UpdateCustomerAddressDocument } from './UpdateCustomerAddress.gql'

const useStyles = makeStyles(
  () => ({
    editActions: {
      paddingBottom: 0,
    },
  }),
  { name: 'EditAddressForm' },
)

type EditAddressFormProps = {
  address?: AccountAddressFragment
} & CountryRegionsQuery

export default function EditAddressForm(props: EditAddressFormProps) {
  const { countries, address } = props
  const formClasses = useFormStyles()
  const classes = useStyles()
  const router = useRouter()

  const form = useFormGqlMutation(UpdateCustomerAddressDocument, {
    defaultValues: {
      id: address?.id ?? undefined,
      firstname: address?.firstname,
      lastname: address?.lastname,
      street: address?.street?.[0] ?? undefined,
      postcode: address?.postcode,
      city: address?.city,
      countryCode: address?.country_code,
      telephone: address?.telephone,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      houseNumber: address?.street?.[1],
      addition: address?.street?.[2],
    },
    onBeforeSubmit: (formData) => {
      const region = countries
        ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
        ?.available_regions?.find((r) => r?.id === formData.region)
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
    onComplete: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/account/addresses')
    },
  })

  const { handleSubmit, formState, required, error, muiRegister, valid } = form
  const submitHandler = handleSubmit(() => {})

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

        <FormActions classes={{ root: classes.editActions }}>
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

      <ApolloErrorAlert error={error} />
    </>
  )
}
