import { TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
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
        street: [(formData as any).houseNumber, (formData as any).addition, formData.street[0]],
        region:
          (region && {
            region: region.name,
            region_code: region.code,
            region_id: region.id,
          }) ??
          {},
        defaultBilling: false,
        defaultShipping: false,
      }
    },
  })

  const { handleSubmit, formState, required, error, errors, reset, register } = form
  const submitHandler = handleSubmit((data, e) => {
    e?.target.reset()
  })

  return (
    <>
      <form onSubmit={submitHandler} noValidate className={classes.form}>
        <NameFields
          {...form}
          disableFields={formState.isSubmitting}
          fieldOptions={{
            prefix: {
              name: 'prefix',
              required: required.prefix,
            },
            firstname: {
              name: 'firstname',
              required: required.firstname,
            },
            lastname: {
              name: 'lastname',
              required: required.lastname,
            },
          }}
        />
        <AddressFields
          {...form}
          countries={countries}
          disableFields={formState.isSubmitting}
          fieldOptions={{
            street: {
              name: 'street',
              required: required.street,
            },
            houseNumber: {
              name: 'houseNumber',
              required: true,
            },
            addition: {
              name: 'addition',
              required: false,
            },
            postcode: {
              name: 'postcode',
              required: required.postcode,
            },
            city: {
              name: 'city',
              required: required.city,
            },
            countryCode: {
              name: 'countryCode',
              required: required.countryCode,
            },
            regionId: {
              name: 'region',
              required: required.region,
            },
          }}
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
            InputProps={{
              endAdornment: !errors.telephone && <CheckIcon className={classes.checkmark} />,
            }}
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

      <MessageSnackbarLoader
        open={formState.isSubmitSuccessful && !error?.message}
        message={<>Successfully added new address</>}
      />
    </>
  )
}
