import { makeStyles, TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import { phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
import clsx from 'clsx'
import React from 'react'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import AddressFields from '../AddressFields'
import NameFields from '../NameFields'
import {
  UpdateCustomerAddressDocument,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
} from './UpdateCustomerAddress.gql'

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

  const form = useFormGqlMutation<
    UpdateCustomerAddressMutation,
    UpdateCustomerAddressMutationVariables
  >(UpdateCustomerAddressDocument, {
    defaultValues: {
      id: address?.id ?? undefined,
      firstname: address?.firstname,
      lastname: address?.lastname,
      street: address?.street?.[2],
      postcode: address?.postcode,
      city: address?.city,
      countryCode: address?.country_code,
      telephone: address?.telephone,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      houseNumber: address?.street?.[0],
      addition: address?.street?.[1],
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
        street: [(formData as any).houseNumber, (formData as any).addition, formData?.street?.[0]],
      }
    },
  })

  const { handleSubmit, formState, required, error, errors, register } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <>
      <form onSubmit={submitHandler} noValidate className={formClasses.form}>
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
          regionId={address?.region?.region_id ?? undefined}
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

        <div className={formClasses.formRow}>
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
              endAdornment: !errors.telephone && <CheckIcon className={formClasses.checkmark} />,
            }}
          />
        </div>

        <div className={formClasses.divider} />

        <div className={clsx(formClasses.actions, classes.editActions)}>
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
        message={<>Changes were saved</>}
      />
    </>
  )
}
