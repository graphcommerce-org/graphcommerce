import { TextField } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
import { useRouter } from 'next/router'
import React from 'react'
import AddressFields from '../AddressFields'
import NameFields from '../NameFields'
import { CreateCustomerAddressDocument } from './CreateCustomerAddress.gql'

type CreateCustomerAddressFormProps = CountryRegionsQuery

export default function CreateCustomerAddressForm(props: CreateCustomerAddressFormProps) {
  const { countries } = props
  const classes = useFormStyles()
  const router = useRouter()

  const form = useFormGqlMutation(CreateCustomerAddressDocument, {
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

  const { handleSubmit, formState, required, error, muiRegister, valid } = form
  const submitHandler = handleSubmit((_, e) => {
    if (!formState.errors) e?.target.reset()
  })

  return (
    <>
      <form onSubmit={submitHandler} noValidate className={classes.form}>
        <NameFields form={form} disabled={formState.isSubmitting} prefix />
        <AddressFields form={form} countries={countries} disabled={formState.isSubmitting} />

        <div className={classes.formRow}>
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
