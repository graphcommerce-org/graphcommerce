import { TextField } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import useFormValidFields from '@reachdigital/react-hook-form/useFormValidFields'
import { phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
import { useRouter } from 'next/router'
import React from 'react'
import AddressFields from '../AddressFields'
import NameFields from '../NameFields'
import {
  CreateCustomerAddressDocument,
  CreateCustomerAddressMutation,
  CreateCustomerAddressMutationVariables,
} from './CreateCustomerAddress.gql'

type CreateCustomerAddressFormProps = CountryRegionsQuery

export default function CreateCustomerAddressForm(props: CreateCustomerAddressFormProps) {
  const { countries } = props
  const classes = useFormStyles()
  const router = useRouter()

  const form = useFormGqlMutation<
    CreateCustomerAddressMutation,
    CreateCustomerAddressMutationVariables
  >(CreateCustomerAddressDocument, {
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
  })

  const { handleSubmit, formState, required, error, errors, register } = form
  const submitHandler = handleSubmit((data, e) => {
    if (!errors) e?.target.reset()
  })
  const validFields = useFormValidFields({ form })

  return (
    <>
      <form onSubmit={submitHandler} noValidate className={classes.form}>
        <NameFields
          form={form}
          disabled={formState.isSubmitting}
          validFields={validFields}
          required={required}
          prefix='prefix'
          firstname='firstname'
          lastname='lastname'
        />
        <AddressFields
          form={form}
          countries={countries}
          disabled={formState.isSubmitting}
          validFields={validFields}
          required={required}
          street='street'
          houseNumber='houseNumber'
          addition='addition'
          postcode='postcode'
          city='city'
          countryCode='countryCode'
          regionId='regionId'
        />

        <div className={classes.formRow}>
          <TextField
            variant='outlined'
            type='text'
            error={!!errors.telephone}
            required={required.telephone}
            name='telephone'
            label='Telephone'
            inputRef={register({
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && errors.telephone?.message}
            disabled={formState.isSubmitting}
            InputProps={{ endAdornment: validFields.telephone && <InputCheckmark /> }}
          />
        </div>

        <div className={classes.divider} />

        <div className={classes.actions}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            Save changes
          </Button>
        </div>
      </form>

      <ApolloErrorAlert error={error} />
    </>
  )
}
